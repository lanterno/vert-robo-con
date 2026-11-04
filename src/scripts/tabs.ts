/**
 * Tabs: a row of buttons that each show one panel. Mark the list with
 * `role="tablist"` inside an element with `data-tabs`; each tab is a button
 * with `role="tab"` and `aria-controls` naming its panel.
 *
 * Without JavaScript every panel shows, one after another. With it, one
 * panel shows at a time; arrow keys, Home and End move between tabs, as the
 * ARIA tabs pattern describes, and only the selected tab is in the Tab order.
 */
export function initTabs(): void {
  for (const root of document.querySelectorAll<HTMLElement>('[data-tabs]')) {
    if (root.dataset['tabsReady']) continue;
    root.dataset['tabsReady'] = 'true';
    const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const panelOf = (t: HTMLElement) => document.getElementById(t.getAttribute('aria-controls') ?? '');

    const select = (tab: HTMLButtonElement, focus: boolean) => {
      for (const t of tabs) {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = panelOf(t);
        if (panel) panel.hidden = !on;
      }
      if (focus) tab.focus();
    };

    const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0];
    if (initial) select(initial, false);

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab, false));
      tab.addEventListener('keydown', (event) => {
        const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[event.key];
        if (to === undefined) return;
        event.preventDefault();
        const next = tabs[(to + tabs.length) % tabs.length];
        if (next) select(next, true);
      });
    });
  }
}
