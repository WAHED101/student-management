// Lessons interactivity: search, filter, sort, view toggle, and basic actions
(function () {
  const grid = document.getElementById('lesGrid');
  if (!grid) return;

  const searchInput = document.getElementById('lesSearch');
  const sortSelect = document.getElementById('lesSort');
  const filtersWrap = document.getElementById('lesFilters');
  const viewGridBtn = document.getElementById('lesViewGrid');
  const viewListBtn = document.getElementById('lesViewList');

  const getCards = () => Array.from(grid.querySelectorAll('.les-card'));

  function normalize(str) {
    return (str || '').toString().toLowerCase().trim();
  }

  function applySearch() {
    const term = normalize(searchInput?.value || '');
    getCards().forEach((card) => {
      const title = normalize(card.getAttribute('data-title'));
      card.style.display = title.includes(term) ? '' : 'none';
    });
  }

  function applyFilter(category) {
    const term = normalize(searchInput?.value || '');
    getCards().forEach((card) => {
      const matchesCat = category === 'all' || normalize(card.getAttribute('data-category')) === category;
      const matchesSearch = normalize(card.getAttribute('data-title')).includes(term);
      card.style.display = matchesCat && matchesSearch ? '' : 'none';
    });
  }

  function applySort(mode) {
    const cards = getCards().filter((c) => c.style.display !== 'none');
    const byTitle = (a, b) =>
      normalize(a.getAttribute('data-title')).localeCompare(normalize(b.getAttribute('data-title')));
    const byDuration = (a, b) =>
      Number(b.getAttribute('data-duration') || 0) - Number(a.getAttribute('data-duration') || 0);

    if (mode === 'az') cards.sort(byTitle);
    else if (mode === 'za') cards.sort((a, b) => byTitle(b, a));
    else if (mode === 'duration') cards.sort(byDuration);
    else cards.sort(() => 0); // recent (keep DOM order)

    const frag = document.createDocumentFragment();
    cards.forEach((c) => frag.appendChild(c));
    grid.appendChild(frag);
  }

  function setView(view) {
    const buttons = [viewGridBtn, viewListBtn];
    buttons.forEach((b) => b && b.classList.remove('active'));
    if (view === 'list') {
      grid.classList.add('list');
      viewListBtn && viewListBtn.classList.add('active');
    } else {
      grid.classList.remove('list');
      viewGridBtn && viewGridBtn.classList.add('active');
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applySearch();
      applySort(sortSelect?.value || 'recent');
    });
  }

  if (filtersWrap) {
    filtersWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.les-chip');
      if (!btn) return;
      filtersWrap.querySelectorAll('.les-chip').forEach((c) => c.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.getAttribute('data-filter') || 'all');
      applySort(sortSelect?.value || 'recent');
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => applySort(sortSelect.value));
  }

  if (viewGridBtn) viewGridBtn.addEventListener('click', () => setView('grid'));
  if (viewListBtn) viewListBtn.addEventListener('click', () => setView('list'));

  // Action buttons (demo)
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const card = btn.closest('.les-card');
    const title = card?.getAttribute('data-title') || 'Lesson';
    if (action === 'continue' || action === 'start' || action === 'review') {
      console.log('Open player for:', title);
    } else if (action === 'details') {
      console.log('Open details for:', title);
    }
  });

  // Initial state
  setView('list');
  applyFilter('all');
  applySort(sortSelect?.value || 'recent');
})();

