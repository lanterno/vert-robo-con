/**
 * Opening and closing sheets (src/components/ui/Sheet.astro).
 *
 * A sheet is a native <dialog> opened with showModal(), which does the hard
 * parts: the rest of the page becomes inert and Esc closes it. This adds what
 * the dialog doesn't: Tab wraps from the last control to the first, rather
 * than leaving for the browser's own controls; any element with
 * `data-sheet-open="<id>"` opens the sheet; a click on the backdrop closes
 * it; the page behind doesn't scroll; and focus goes back to the control
 * that opened it.
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

function focusable(dialog: HTMLDialogElement): HTMLElement[] {
  return [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => el.getClientRects().length > 0 && !el.closest('[hidden], template'),
  );
}

const openers = new WeakMap<HTMLDialogElement, HTMLElement | null>();

export function openSheet(dialog: HTMLDialogElement, opener: HTMLElement | null = null): void {
  if (dialog.open) return;
  openers.set(dialog, opener ?? (document.activeElement as HTMLElement | null));
  dialog.showModal();
  document.documentElement.classList.add('sheet-open');
}

export function closeSheet(dialog: HTMLDialogElement): void {
  if (dialog.open) dialog.close();
}

function wire(dialog: HTMLDialogElement): void {
  if (dialog.dataset['sheetReady']) return;
  dialog.dataset['sheetReady'] = 'true';

  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[data-sheet][open]')) {
      document.documentElement.classList.remove('sheet-open');
    }
    openers.get(dialog)?.focus();
    openers.delete(dialog);
  });

  // The sheet's content fills the dialog, so a click whose target is the
  // dialog itself landed on the backdrop.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeSheet(dialog);
  });

  // Keep Tab inside: from the last control to the first, and back.
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const items = focusable(dialog);
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    const active = document.activeElement;
    if (event.shiftKey && (active === first || !dialog.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  });

  for (const button of dialog.querySelectorAll('[data-sheet-close]')) {
    button.addEventListener('click', () => closeSheet(dialog));
  }
}

export function initSheets(): void {
  for (const dialog of document.querySelectorAll<HTMLDialogElement>('dialog[data-sheet]')) wire(dialog);

  if (document.documentElement.dataset['sheetsReady']) return;
  document.documentElement.dataset['sheetsReady'] = 'true';

  // One listener for every opener, including ones added later. An opener can
  // be a link with a real href, which still works without JavaScript.
  document.addEventListener('click', (event) => {
    const opener = (event.target as Element | null)?.closest<HTMLElement>('[data-sheet-open]');
    const id = opener?.dataset['sheetOpen'];
    if (!opener || !id) return;
    const dialog = document.getElementById(id);
    if (!(dialog instanceof HTMLDialogElement)) return;
    event.preventDefault();
    openSheet(dialog, opener);
  });
}
