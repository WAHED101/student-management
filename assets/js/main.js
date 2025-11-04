 const sidebare = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleSidebarBtn');
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  const tooltipList = tooltipTriggerList.map(el => new bootstrap.Tooltip(el));

  if (toggleBtn && sidebare) {
    toggleBtn.addEventListener('click', () => {
      sidebare.classList.toggle('collapsed');
      toggleBtn.classList.toggle('rotate');
    });
  }





document.addEventListener('DOMContentLoaded', function () {
  const sidebarLinks = document.querySelectorAll('#sidebar .nav-link');
  const sections = document.querySelectorAll('.content-section');

  if (sidebarLinks.length > 0 && sections.length > 0) {
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        sidebarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        sections.forEach(section => section.classList.add('d-none'));

        const sectionId = this.dataset.section + 'Section';
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.classList.remove('d-none');
        }
      });
    });
  }
});
