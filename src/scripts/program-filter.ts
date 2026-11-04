/**
 * The program's filters (#29): day, session type, track and a search.
 *
 * Every session is on the page, each tagged with what it is; filtering shows
 * and hides them. Without JavaScript the filters are hidden and the whole
 * program shows, day by day.
 */
function text(el: Element): string {
  return (el.textContent ?? '').toLowerCase();
}

export function initProgramFilter(): void {
  const root = document.querySelector<HTMLElement>('[data-program]');
  if (!root || root.dataset['programReady']) return;
  root.dataset['programReady'] = 'true';

  const controls = root.querySelector<HTMLElement>('[data-program-controls]');
  // Each selector names one thing only: a session row carries its day and
  // kind too, so a looser selector would pick up the rows as well as the
  // controls, and the two would fight over which rows are hidden.
  const sessions = [...root.querySelectorAll<HTMLElement>('[data-session]')];
  const daySections = [...root.querySelectorAll<HTMLElement>('[data-day-section]')];
  const dayTabs = [...root.querySelectorAll<HTMLButtonElement>('[data-day-tab]')];
  const kindButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-kind-filter]')];
  const trackSelect = root.querySelector<HTMLSelectElement>('[data-track]');
  const search = root.querySelector<HTMLInputElement>('[data-search]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const clear = root.querySelector<HTMLButtonElement>('[data-clear]');
  const count = root.querySelector<HTMLElement>('[data-count]');

  // The filters only work with JavaScript, so they are hidden until now.
  controls?.removeAttribute('hidden');

  let day = dayTabs[0]?.dataset['dayTab'] ?? '1';
  let kind = 'all';

  const apply = () => {
    const track = trackSelect?.value ?? 'all';
    const query = (search?.value ?? '').trim().toLowerCase();
    let shown = 0;

    for (const el of sessions) {
      const matches =
        el.dataset['sessionDay'] === day &&
        (kind === 'all' || el.dataset['sessionKind'] === kind) &&
        (track === 'all' || el.dataset['sessionTrack'] === track) &&
        (query === '' || text(el).includes(query));
      el.hidden = !matches;
      if (matches) shown++;
    }

    for (const section of daySections) section.hidden = section.dataset['daySection'] !== day;
    for (const tab of dayTabs) {
      const on = tab.dataset['dayTab'] === day;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
    }
    for (const button of kindButtons) button.setAttribute('aria-pressed', String(button.dataset['kindFilter'] === kind));

    if (empty) empty.hidden = shown > 0;
    if (count) count.textContent = `${shown} ${shown === 1 ? 'session' : 'sessions'}`;
  };

  dayTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      day = tab.dataset['dayTab'] ?? day;
      apply();
    });
    tab.addEventListener('keydown', (event) => {
      const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: dayTabs.length - 1 }[event.key];
      if (to === undefined) return;
      event.preventDefault();
      const next = dayTabs[(to + dayTabs.length) % dayTabs.length];
      if (!next) return;
      day = next.dataset['dayTab'] ?? day;
      apply();
      next.focus();
    });
  });

  for (const button of kindButtons) {
    button.addEventListener('click', () => {
      kind = button.dataset['kindFilter'] ?? 'all';
      apply();
    });
  }
  trackSelect?.addEventListener('change', apply);
  search?.addEventListener('input', apply);
  clear?.addEventListener('click', () => {
    kind = 'all';
    if (trackSelect) trackSelect.value = 'all';
    if (search) search.value = '';
    apply();
  });

  apply();
}
