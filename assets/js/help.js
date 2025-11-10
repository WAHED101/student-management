// Help Center interactivity: FAQ search, expand/collapse all, and quick link routing
(function () {
  const accordion = document.getElementById('helpAccordion');
  if (!accordion) return;

  const searchInput = document.getElementById('helpSearch');
  const expandAllBtn = document.getElementById('helpExpandAll');
  const collapseAllBtn = document.getElementById('helpCollapseAll');

  const items = Array.from(accordion.querySelectorAll('.help-item'));

  function normalize(str) {
    return (str || '').toString().toLowerCase().trim();
  }

  function setCollapse(el, show) {
    const collapseEl = el.querySelector('.accordion-collapse');
    if (!collapseEl) return;
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });
    show ? bsCollapse.show() : bsCollapse.hide();
  }

  function filterFaqs() {
    const term = normalize(searchInput?.value || '');
    items.forEach((item) => {
      const title = normalize(item.querySelector('.accordion-button')?.textContent || '');
      const keys = normalize(item.getAttribute('data-keywords'));
      const match = title.includes(term) || keys.includes(term);
      item.style.display = match ? '' : 'none';
      if (!match) setCollapse(item, false);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterFaqs);
  }

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      items.filter((i) => i.style.display !== 'none').forEach((i) => setCollapse(i, true));
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      items.forEach((i) => setCollapse(i, false));
    });
  }

  // Quick links navigate via existing section switching logic (data-section)
  document.querySelectorAll('.help-link[data-section]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      // Simulate click on sidebar/mobile link with same data-section
      const target = document.querySelector(`[data-section="${section}"]`);
      if (target) target.click();
    });
  });
})();

