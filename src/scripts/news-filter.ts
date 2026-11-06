/**
 * The news list's type filter (#34).
 *
 * Every post is on the page; the filter hides the ones that don't match.
 * Without JavaScript the whole list shows and the filter is hidden.
 */
export function initNewsFilter(): void {
  const root = document.querySelector<HTMLElement>('[data-news]');
  if (!root || root.dataset['newsReady']) return;
  root.dataset['newsReady'] = 'true';

  const controls = root.querySelector<HTMLElement>('[data-news-controls]');
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-type-filter]')];
  const posts = [...root.querySelectorAll<HTMLElement>('[data-post]')];
  const groups = [...root.querySelectorAll<HTMLElement>('[data-group]')];
  const count = root.querySelector<HTMLElement>('[data-count]');

  controls?.removeAttribute('hidden');
  let type = 'all';

  const apply = () => {
    let shown = 0;
    for (const post of posts) {
      const matches = type === 'all' || post.dataset['postType'] === type;
      post.hidden = !matches;
      if (matches) shown++;
    }
    // A year with nothing left in it goes too.
    for (const group of groups) {
      group.hidden = [...group.querySelectorAll<HTMLElement>('[data-post]')].every((p) => p.hidden);
    }
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset['typeFilter'] === type));
    if (count) count.textContent = `${shown} ${shown === 1 ? 'post' : 'posts'}`;
  };

  for (const button of buttons) {
    button.addEventListener('click', () => {
      type = button.dataset['typeFilter'] ?? 'all';
      apply();
    });
  }
  apply();
}
