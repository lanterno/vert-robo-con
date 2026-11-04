/**
 * `astro preview` on exactly the given port, for the Playwright checks.
 *
 * Astro moves to the next port when the one asked for is taken, and says so
 * only in its log. In a test run that is dangerous: if the previous run's
 * server is still shutting down on the port, the tests talk to it instead of
 * this run's server, and fail halfway through when it exits. So this waits
 * for the port to be free, then starts the preview, and stops with an error
 * if Astro tries to move.
 *
 * Usage: node scripts/preview-strict.mjs 4321
 */
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';

const port = Number(process.argv[2] ?? 4321);
const WAIT_MS = 20_000;

const isFree = () =>
  new Promise((resolve) => {
    const probe = createServer()
      .once('error', () => resolve(false))
      .once('listening', () => probe.close(() => resolve(true)))
      // The address astro preview listens on; probing every interface can
      // succeed while localhost is taken.
      .listen(port, 'localhost');
  });

const started = Date.now();
while (!(await isFree())) {
  if (Date.now() - started > WAIT_MS) {
    console.error(`Port ${port} is still in use after ${WAIT_MS / 1000}s. Stop whatever is running on it.`);
    process.exit(1);
  }
  await new Promise((r) => setTimeout(r, 250));
}

const bin = fileURLToPath(new URL('../node_modules/.bin/astro', import.meta.url));
const astro = spawn(bin, ['preview', '--port', String(port)], { stdio: ['ignore', 'pipe', 'inherit'] });
astro.stdout.on('data', (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text);
  if (/trying another one/i.test(text)) {
    console.error(`astro preview could not take port ${port}; refusing to run the checks on another port.`);
    astro.kill();
    process.exit(1);
  }
});
astro.on('exit', (code) => process.exit(code ?? 0));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => astro.kill(signal));
