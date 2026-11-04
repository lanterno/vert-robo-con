/**
 * The video library's filters (#30): type, edition, topic and a search.
 *
 * Every video is on the page, grouped into shelves. Filtering hides the
 * shelves and shows one grid of what matched, as WatchV3 does. Without
 * JavaScript the shelves stand on their own and the filters are hidden.
 */
export function initWatchFilter(): void {
  const root = document.querySelector<HTMLElement>('[data-library]');
  if (!root || root.dataset['libraryReady']) return;
  root.dataset['libraryReady'] = 'true';

  const controls = root.querySelector<HTMLElement>('[data-library-controls]');
  const shelves = root.querySelector<HTMLElement>('[data-shelves]');
  const results = root.querySelector<HTMLElement>('[data-results]');
  const grid = root.querySelector<HTMLElement>('[data-results-grid]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const count = root.querySelector<HTMLElement>('[data-count]');
  const clear = root.querySelector<HTMLButtonElement>('[data-clear]');
  const typeButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-type-filter]')];
  const topicButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-topic-filter]')];
  const editionSelect = root.querySelector<HTMLSelectElement>('[data-edition-filter]');
  const search = root.querySelector<HTMLInputElement>('[data-search]');
  // One card per video, kept out of the page until a filter needs them, so
  // the shelves aren't duplicated in the accessibility tree.
  const cards = [...root.querySelectorAll<HTMLElement>('[data-result]')];

  controls?.removeAttribute('hidden');

  let type = 'all';
  let topic = 'all';

  const apply = () => {
    const edition = editionSelect?.value ?? 'all';
    const query = (search?.value ?? '').trim().toLowerCase();
    const filtering = type !== 'all' || topic !== 'all' || edition !== 'all' || query !== '';

    let shown = 0;
    for (const card of cards) {
      const matches =
        (type === 'all' || card.dataset['videoType'] === type) &&
        (topic === 'all' || (card.dataset['videoTopics'] ?? '').split(' ').includes(topic)) &&
        (edition === 'all' || card.dataset['videoEdition'] === edition) &&
        (query === '' || (card.dataset['videoText'] ?? '').includes(query));
      card.hidden = !matches;
      if (matches) shown++;
    }

    for (const button of typeButtons) button.setAttribute('aria-pressed', String(button.dataset['typeFilter'] === type));
    for (const button of topicButtons) button.setAttribute('aria-pressed', String(button.dataset['topicFilter'] === topic));

    if (shelves) shelves.hidden = filtering;
    if (results) results.hidden = !filtering;
    if (grid) grid.hidden = shown === 0;
    if (empty) empty.hidden = !filtering || shown > 0;
    if (count) count.textContent = `${shown} ${shown === 1 ? 'video' : 'videos'}`;
  };

  for (const button of typeButtons) {
    button.addEventListener('click', () => {
      type = button.dataset['typeFilter'] ?? 'all';
      apply();
    });
  }
  for (const button of topicButtons) {
    button.addEventListener('click', () => {
      // A second press on the same topic clears it.
      topic = topic === button.dataset['topicFilter'] ? 'all' : (button.dataset['topicFilter'] ?? 'all');
      apply();
    });
  }
  editionSelect?.addEventListener('change', apply);
  search?.addEventListener('input', apply);
  clear?.addEventListener('click', () => {
    type = 'all';
    topic = 'all';
    if (editionSelect) editionSelect.value = 'all';
    if (search) search.value = '';
    apply();
  });

  apply();
}
