/**
 * The header's Community and About menus: disclosure buttons, each showing a
 * list of links, as on HomeV3. This is the disclosure pattern rather than an
 * ARIA menu, because the items are ordinary links and Tab should move
 * through them.
 *
 * A menu opens and closes from its button, and opening one closes the other.
 * Esc closes it and puts focus back on its button. A click elsewhere, or
 * focus moving out of it, closes it too.
 */

function setOpen(root: HTMLElement, open: boolean): void {
  const button = root.querySelector<HTMLButtonElement>('[aria-controls]');
  const panel = button && document.getElementById(button.getAttribute('aria-controls') ?? '');
  if (!button || !panel) return;
  button.setAttribute('aria-expanded', String(open));
  panel.hidden = !open;
}

export function initDisclosureNav(): void {
  const roots = [...document.querySelectorAll<HTMLElement>('[data-disclosure]')];
  const closeAll = (except?: HTMLElement) => {
    for (const r of roots) if (r !== except) setOpen(r, false);
  };

  for (const root of roots) {
    if (root.dataset['disclosureReady']) continue;
    root.dataset['disclosureReady'] = 'true';
    const button = root.querySelector<HTMLButtonElement>('[aria-controls]');
    if (!button) continue;

    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      closeAll(root);
      setOpen(root, open);
    });

    root.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || button.getAttribute('aria-expanded') !== 'true') return;
      event.preventDefault();
      setOpen(root, false);
      button.focus();
    });

    root.addEventListener('focusout', (event) => {
      const next = event.relatedTarget as Node | null;
      if (next && !root.contains(next)) setOpen(root, false);
    });

    // Following a link, or opening a sheet from the menu, closes it.
    root.addEventListener('click', (event) => {
      if ((event.target as Element).closest('a, [data-sheet-open]') && root.contains(event.target as Node)) {
        setOpen(root, false);
      }
    });
  }

  document.addEventListener('click', (event) => {
    const inside = roots.some((r) => r.contains(event.target as Node));
    if (!inside) closeAll();
  });
}
