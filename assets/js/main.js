document.addEventListener('DOMContentLoaded', function () {

 const sidebare = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleSidebarBtn');
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));


  if (toggleBtn && sidebare) {
    toggleBtn.addEventListener('click', () => {
      sidebare.classList.toggle('collapsed');
      toggleBtn.classList.toggle('rotate');
    });
  }
// ---------------------------- side bar collapsed code 


  const sidebarLinks = document.querySelectorAll('#sidebar .nav-link');
  const sections = document.querySelectorAll('.content-section');

  // Function to switch sections
  const switchSection = (sectionName, activeLinks = null) => {
    sections.forEach(section => section.classList.add('d-none'));
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
      targetSection.classList.remove('d-none');
    }
    if (activeLinks) {
      activeLinks.forEach(l => l.classList.remove('active'));
    }
  };

  if (sidebarLinks.length > 0 && sections.length > 0) {
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        sidebarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        switchSection(this.dataset.section);
      });
    });
  }
// ------------------------------------------- site bar section call code 

  // Mobile bottom navbar navigation
  const mobileBottomNavLinks = document.querySelectorAll('.mobile-navbar-bottom .nav-link[data-section]');
  mobileBottomNavLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      switchSection(this.dataset.section, sidebarLinks);
    });
  });

  // Mobile menu dropdown toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuDropdown = document.getElementById('mobileMenuDropdown');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');

  if (mobileMenuToggle && mobileMenuDropdown && mobileMenuBackdrop) {
    function toggleMenu() {
      mobileMenuDropdown.classList.toggle('show');
      mobileMenuBackdrop.classList.toggle('show');
    }

    function closeMenu() {
      mobileMenuDropdown.classList.remove('show');
      mobileMenuBackdrop.classList.remove('show');
    }

    mobileMenuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close dropdown when clicking on backdrop
    mobileMenuBackdrop.addEventListener('click', function () {
      closeMenu();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
      if (!mobileMenuDropdown.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close dropdown when clicking on a menu item
    const mobileMenuLinks = mobileMenuDropdown.querySelectorAll('.nav-link');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });
  }

  // Mobile More menu dropdown toggle (bottom navbar)
  const mobileMoreToggle = document.getElementById('mobileMoreToggle');
  const mobileMoreDropdown = document.getElementById('mobileMoreDropdown');
  const mobileMoreBackdrop = document.getElementById('mobileMoreBackdrop');

  if (mobileMoreToggle && mobileMoreDropdown && mobileMoreBackdrop) {
    const resetAnimations = () => {
      mobileMoreDropdown.querySelectorAll('.nav-item').forEach(item => {
        item.style.animation = 'none';
        item.offsetWidth; // Force reflow
        item.style.animation = '';
      });
    };

    const openMenu = () => {
      mobileMoreDropdown.classList.remove('closing');
      resetAnimations();
      mobileMoreDropdown.classList.add('show');
      mobileMoreBackdrop.classList.add('show');
    };

    const closeMenu = () => {
      mobileMoreDropdown.classList.add('closing');
      mobileMoreBackdrop.classList.remove('show');
      setTimeout(() => {
        mobileMoreDropdown.classList.remove('show', 'closing');
        resetAnimations();
      }, 300);
    };

    mobileMoreToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileMoreDropdown.classList.contains('show') ? closeMenu() : openMenu();
    });

    mobileMoreBackdrop.addEventListener('click', closeMenu);

    document.addEventListener('click', (e) => {
      if (!mobileMoreDropdown.contains(e.target) && !mobileMoreToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Event delegation for menu items
    mobileMoreDropdown.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-link');
      if (!link || !link.dataset.section) return;
      
      e.preventDefault();
      switchSection(link.dataset.section, sidebarLinks);
      closeMenu();
    });
  }


  
});
// ======== Dynamic Topbar Title Updater ========
document.addEventListener('DOMContentLoaded', function () {
  const topbarTitle = document.querySelector('.topbar-left span');
  const sidebarLinks = document.querySelectorAll('#sidebar .nav-link, .mobile-navbar-bottom .nav-link[data-section]');

  if (sidebarLinks.length > 0 && topbarTitle) {
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function () {
        const sectionName = this.dataset.section;
        if (sectionName) {
          let formattedTitle = sectionName.replace(/-/g, ' ');
          formattedTitle = formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
          topbarTitle.textContent = formattedTitle;
        }
      });
    });
  }
});
