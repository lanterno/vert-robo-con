/**
 * The person drawer (src/components/site/PersonDrawer.astro).
 *
 * Each person's profile is rendered on the server into a <template>; opening
 * the drawer copies one into the sheet. Previous and next step through the
 * templates in order. A person card is a link to /people/<slug>, so it
 * still works without JavaScript; with it, the card opens the drawer.
 */
import { openSheet } from './sheet';

function show(dialog: HTMLDialogElement, slugs: string[], index: number): void {
  const slug = slugs[index];
  const tpl = dialog.querySelector<HTMLTemplateElement>(`template[data-person="${CSS.escape(slug ?? '')}"]`);
  const body = dialog.querySelector<HTMLElement>('[data-person-body]');
  if (!slug || !tpl || !body) return;

  body.replaceChildren(tpl.content.cloneNode(true));
  dialog.dataset['index'] = String(index);

  const pos = dialog.querySelector<HTMLElement>('[data-person-pos]');
  if (pos) pos.textContent = `${dialog.dataset['context'] ?? ''} · ${index + 1} OF ${slugs.length}`.replace(/^ · /, '');

  const nameOf = (i: number) =>
    dialog.querySelector<HTMLTemplateElement>(`template[data-person="${CSS.escape(slugs[i] ?? '')}"]`)?.dataset['name'] ?? '';
  for (const [sel, i] of [
    ['[data-person-prev]', index - 1],
    ['[data-person-next]', index + 1],
  ] as const) {
    const button = dialog.querySelector<HTMLButtonElement>(sel);
    if (!button) continue;
    const at = i >= 0 && i < slugs.length;
    button.setAttribute('aria-disabled', String(!at));
    button.setAttribute('aria-label', `${sel.includes('prev') ? 'Previous' : 'Next'}${at ? `: ${nameOf(i)}` : ''}`);
  }

  const copy = body.querySelector<HTMLButtonElement>('[data-person-copy]');
  const url = body.querySelector<HTMLElement>('[data-person-url]');
  copy?.addEventListener('click', async () => {
    const link = new URL(`/people/${slug}`, location.origin).href;
    try {
      await navigator.clipboard.writeText(link);
      if (url) url.textContent = `Copied: ${link}`;
    } catch {
      // No clipboard access: show the link so it can be copied by hand.
      if (url) {
        url.textContent = link;
        getSelection()?.selectAllChildren(url);
      }
    }
  });
}

export function initPersonDrawers(): void {
  for (const dialog of document.querySelectorAll<HTMLDialogElement>('dialog[data-person-drawer]')) {
    if (dialog.dataset['personReady']) continue;
    dialog.dataset['personReady'] = 'true';
    const slugs = [...dialog.querySelectorAll<HTMLTemplateElement>('template[data-person]')].map((t) => t.dataset['person'] ?? '');

    for (const [sel, step] of [
      ['[data-person-prev]', -1],
      ['[data-person-next]', 1],
    ] as const) {
      dialog.querySelector(sel)?.addEventListener('click', () => {
        const next = Number(dialog.dataset['index'] ?? 0) + step;
        if (next >= 0 && next < slugs.length) show(dialog, slugs, next);
      });
    }

    document.addEventListener('click', (event) => {
      const opener = (event.target as Element | null)?.closest<HTMLElement>('[data-person-open]');
      if (!opener || (opener.dataset['personDrawer'] ?? 'person-drawer') !== dialog.id) return;
      const index = slugs.indexOf(opener.dataset['personOpen'] ?? '');
      if (index < 0) return;
      event.preventDefault();
      show(dialog, slugs, index);
      openSheet(dialog, opener);
    });
  }
}
