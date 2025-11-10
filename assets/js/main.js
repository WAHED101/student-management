// ---------------------------- side bar collapsed code Arpon

const sidebare = document.getElementById('sidebar');
const toggleBtnn = document.getElementById('toggleSidebarBtn');
const logo = document.getElementById('sidebarLogo');

// Toggle button click — collapse/un-collapse
toggleBtnn.addEventListener('click', () => {
  sidebare.classList.toggle('collapsed');
});

// Click logo — only expands if collapsed
logo.addEventListener('click', () => {
  if (sidebare.classList.contains('collapsed')) {
    sidebare.classList.remove('collapsed');
  }
});



  const sidebarLinks = document.querySelectorAll('#sidebar .nav-link');
  const sections = document.querySelectorAll('.content-section');
  const brandText = document.querySelector(".nav--brand p");
  const toggleBtn = document.getElementById("toggleSidebarBtn");
  const sidebar = document.getElementById("sidebar");

  // Function to switch sections
  const switchSection = (sectionName, activeLinks = null) => {
    sections.forEach(section => section.classList.add('d-none'));
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
      targetSection.classList.remove('d-none');
      // ===== nupur =====
      // Initialize charts when Progress section is shown
      if (sectionName === 'Progress') {
        setTimeout(initializeCharts, 300);
      }
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



// ------------------------------------------- site bar section call code Arpon
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
};
  

// ======== Dynamic Topbar Title Updater Arpon========
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





// ======================================================================================




// Password visibility toggle wahed
(function () {
  const toggleBtns = document.querySelectorAll(".toggle-password");
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.previousElementSibling;
      if (!input) return;
      const isPassword = input.getAttribute("type") === "password";
      input.setAttribute("type", isPassword ? "text" : "password");
      const icon = btn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
      }
      btn.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
      );
    });
  });
})

  // Validation disabled as requested wahed
  (function () {
    const form =
      document.getElementById("signupForm") || document.querySelector("form");
    if (!form) return;
    // intentionally no-op: no input listeners, no submit prevention, no error styling
  });

// Date picker (Flatpickr) initialization
(function () {
  const dobInput = document.getElementById("dob");
  if (!dobInput || typeof window.flatpickr !== "function") return;
  const originalClasses = dobInput.className;
  const originalPlaceholder = dobInput.getAttribute("placeholder") || "";
  window.flatpickr(dobInput, {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    maxDate: "today",
    allowInput: true,
    disableMobile: true,
    monthSelectorType: "dropdown",
    onReady: (selectedDates, dateStr, instance) => {
      const alt = instance._input; // alt input element
      if (alt) {
        // make alt input visually consistent with Bootstrap & existing styles
        alt.classList.add("form-control");
        // copy over the original classes for borders/background to alt input
        originalClasses.split(/\s+/).forEach((c) => c && alt.classList.add(c));
        // add a hook class to target via CSS if needed
        alt.classList.add("date-control-alt");
        if (originalPlaceholder)
          alt.setAttribute("placeholder", originalPlaceholder);
      }
      // Convert year input to dropdown
      convertYearToDropdown(instance);
    },
    onOpen: (selectedDates, dateStr, instance) => {
      // Ensure dropdown remains in sync and exists on reopen
      convertYearToDropdown(instance);
    },
  });

  function convertYearToDropdown(instance) {
    const container = instance && instance.calendarContainer;
    const yearInput = instance && instance.currentYearElement;
    if (!container || !yearInput) return;
    // If we've already converted, just sync value
    let select = container.querySelector("select.flatpickr-year-select");
    const currentYear = instance.currentYear;
    const today = new Date();
    const maxYear = today.getFullYear();
    const minYear = maxYear - 100;
    if (!select) {
      select = document.createElement("select");
      select.className = "flatpickr-year-select";
      // copy minimal sizing from input
      select.style.height = yearInput.offsetHeight
        ? yearInput.offsetHeight + "px"
        : "";
      // Build options
      for (let y = maxYear; y >= minYear; y--) {
        const opt = document.createElement("option");
        opt.value = String(y);
        opt.textContent = String(y);
        select.appendChild(opt);
      }
      // Replace input with select
      yearInput.parentNode &&
        yearInput.parentNode.replaceChild(select, yearInput);
      // Wire change → set year
      select.addEventListener("change", (e) => {
        const y = parseInt(e.target.value, 10);
        if (!Number.isNaN(y)) {
          instance.changeYear(y);
        }
      });
    }
    // Sync selected value
    if (select.value !== String(currentYear)) {
      select.value = String(currentYear);
    }
  }
})();

// Step navigation for multi-step form
(function () {
  const form = document.getElementById("signupForm");
  if (!form) return;
  const steps = Array.from(form.querySelectorAll(".step"));
  const indicators = Array.from(form.querySelectorAll(".indicator-item"));
  const lines = Array.from(form.querySelectorAll(".indicator-line"));
  const btnPrev = form.querySelector(".btn-prev");
  const btnNext = form.querySelector(".btn-next");
  const btnSubmit = form.querySelector(".btn-submit");
  let current = 0;
  let initialized = false;

  // no validation helpers needed (validation removed)

  function stepInputs(index) {
    const step = steps[index];
    return step ? Array.from(step.querySelectorAll("input")) : [];
  }

  function applyEmptyStyles(index, opts) {
    const force = !!(opts && opts.force);
    const inputs = stepInputs(index);
    inputs.forEach((inp) => {
      // Skip optional fields from empty/error styling
      if (inp && inp.name === "reference") {
        inp.classList.remove("is-invalid");
        const groupOpt = inp.parentElement;
        if (groupOpt) groupOpt.classList.remove("has-error");
        return;
      }
      
    });
  }

  function isStepFilled(index) {
    const inputs = stepInputs(index);
    // For steps 1 and 2: require all visible inputs non-empty (ignore password fields if any)
    // For step 3: require all inputs non-empty
    return inputs.every((inp) => {
      // Reference is optional on step 3
      if (inp && inp.name === "reference") return true;
      if (index !== 2 && inp.type === "password") return true;
      return inp.value.trim() !== "";
    });
  }

  function wireStepInputListeners(index) {
    const inputs = stepInputs(index);
    const onInput = () => {
      applyEmptyStyles(index);
      updateControls(index);
    };
    const onBlur = (e) => {
      e.currentTarget.dataset.touched = "true";
      applyEmptyStyles(index);
      updateControls(index);
    };
    inputs.forEach((inp) => {
      if (!inp._wizardBound) {
        inp.addEventListener("input", onInput);
        inp.addEventListener("blur", onBlur);
        inp._wizardBound = true;
      }
    });
  }

  function updateControls(index) {
    // Back button should be invisible (but keep space) on first step
    if (btnPrev) {
      btnPrev.classList.toggle("invisible", index === 0);
      btnPrev.disabled = index === 0; // keep disabled too
    }
    // Next button disabled on steps 0 and 1 if not filled
    if (btnNext) {
      const disableNext = index < steps.length - 1 && !isStepFilled(index);
      btnNext.disabled = disableNext;
    }
    // Submit visible on last step; disable if last step not filled
    if (btnSubmit) {
      btnSubmit.classList.toggle("d-none", index !== steps.length - 1);
      btnSubmit.disabled =
        index === steps.length - 1 ? !isStepFilled(index) : false;
    }
  }

  function setStep(index) {
    const goingForward = index > current;
    steps.forEach((s, i) => s.classList.toggle("active", i === index));
    indicators.forEach((it, i) => it.classList.toggle("active", i <= index));
    lines.forEach((ln, i) => ln.classList.toggle("active", i < index));

    // shimmer the line we just crossed when moving forward
    if (goingForward && index - 1 >= 0 && lines[index - 1]) {
      const targetLine = lines[index - 1];
      targetLine.classList.add("loading");
      setTimeout(() => {
        targetLine.classList.remove("loading");
      }, 700);
    }
    current = index;
    // prepare validation UI and controls for this step
    wireStepInputListeners(index);
    // avoid red error styling on initial load of step 1
    if (initialized || index !== 0) {
      applyEmptyStyles(index);
    }
    // Next visible on non-last, hidden on last; Back/Submit handled in updateControls
    btnNext && btnNext.classList.toggle("d-none", index === steps.length - 1);
    updateControls(index);
    initialized = true;
  }

  function validateCurrentStep() {
    return true;
  }

  btnPrev &&
    btnPrev.addEventListener("click", () => setStep(Math.max(0, current - 1)));
  btnNext &&
    btnNext.addEventListener("click", () => {
      // Force show errors on this step when attempting to advance
      applyEmptyStyles(current, { force: true });
      // only advance if current step is filled
      if (isStepFilled(current)) {
        setStep(Math.min(steps.length - 1, current + 1));
      } else {
        updateControls(current);
        const firstInvalid = steps[current].querySelector(".is-invalid");
        firstInvalid && firstInvalid.focus();
      }
    });

  setStep(0);
})();

// ===== nupur =====
// Chart initialization for Progress section
let chartInstances = {
  subjectChart: null,
  subjectChart2: null,
  subjectChart3: null,
  subjectChart4: null,
  attendanceChart: null,
  attendancePieChart: null
};

// ===== nupur =====
function initializeCharts() {
  // Check if Chart.js is loaded
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js is not loaded');
    return;
  }

  // Check if Progress section is visible
  const progressSection = document.getElementById('ProgressSection');
  if (!progressSection || progressSection.classList.contains('d-none')) {
    return;
  }

  // ===== nupur =====
  // Initialize charts only if they don't exist yet
  try {
    // ===== nupur =====
    // 1st chart - Class progress
    if (!chartInstances.subjectChart) {
      const ctxPie = document.getElementById('subjectChart');
      if (ctxPie) {
        const dataPie = {
          labels: ['Presence', 'Absence'],
          datasets: [{
            label: 'Class Progress %',
            data: [85, 15],
            backgroundColor: ['#7B61FF', '#7b61ff29'],
            hoverOffset: 10,
            borderWidth: 2,
            borderColor: '#fff'
          }]
        };

        const configPie = {
          type: 'doughnut',
          data: dataPie,
          options: {
            cutout: '70%',
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  boxWidth: 8,
                  boxHeight: 8,
                  padding: 15,
                  font: { size: 12, weight: '500' }
                }
              },
              tooltip: {
                enabled: true,
                backgroundColor: 'rgba(30, 34, 40, 0.9)',
                titleFont: { size: 6, weight: '600' },
                bodyFont: { size: 13 },
                displayColors: false,
                callbacks: {
                  label: ctx => `${ctx.label}: ${ctx.parsed}%`
                }
              }
            },
            animation: {
              animateRotate: true,
              duration: 1200
            }
          }
        };

        chartInstances.subjectChart = new Chart(ctxPie, configPie);
      }
    }

    // ===== nupur =====
    // 2nd chart - Attendance progress
    if (!chartInstances.subjectChart2) {
      const ctxPie2 = document.getElementById('subjectChart2');
      if (ctxPie2) {
        const dataPie2 = {
          labels: ['Present', 'Absent'],
          datasets: [{
            label: 'Attendance %',
            data: [95, 5],
            backgroundColor: ['#7B61FF', '#7b61ff29'],
            hoverOffset: 10,
            borderWidth: 2,
            borderColor: '#fff'
          }]
        };

        const configPie2 = {
          type: 'doughnut',
          data: dataPie2,
          options: {
            cutout: '70%',
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  boxWidth: 8,
                  boxHeight: 8,
                  padding: 15,
                  font: { size: 12, weight: '500' }
                }
              },
              tooltip: {
                enabled: true,
                backgroundColor: 'rgba(30, 34, 40, 0.9)',
                titleFont: { size: 6, weight: '600' },
                bodyFont: { size: 13 },
                displayColors: false,
                callbacks: {
                  label: ctx => `${ctx.label}: ${ctx.parsed}%`
                }
              }
            },
            animation: {
              animateRotate: true,
              duration: 1200
            }
          }
        };
        chartInstances.subjectChart2 = new Chart(ctxPie2, configPie2);
      }
    }

    // ===== nupur =====
    // 3rd chart - Subject progress
    if (!chartInstances.subjectChart3) {
      const ctxPie3 = document.getElementById('subjectChart3');
      if (ctxPie3) {
        const dataPie3 = {
          labels: ['Completed', 'Remaining'],
          datasets: [{
            label: 'Subject Progress %',
            data: [75, 25],
            backgroundColor: ['#7B61FF', '#7b61ff29'],
            hoverOffset: 10,
            borderWidth: 2,
            borderColor: '#fff'
          }]
        };

        const configPie3 = {
          type: 'doughnut',
          data: dataPie3,
          options: {
            cutout: '70%',
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  boxWidth: 8,
                  boxHeight: 8,
                  padding: 15,
                  font: { size: 12, weight: '500' }
                }
              },
              tooltip: {
                enabled: true,
                backgroundColor: 'rgba(30, 34, 40, 0.9)',
                titleFont: { size: 6, weight: '600' },
                bodyFont: { size: 13 },
                displayColors: false,
                callbacks: {
                  label: ctx => `${ctx.label}: ${ctx.parsed}%`
                }
              }
            },
            animation: {
              animateRotate: true,
              duration: 1200
            }
          }
        };
        chartInstances.subjectChart3 = new Chart(ctxPie3, configPie3);
      }
    }

    // ===== nupur =====
    // 4th chart - Course progress
    if (!chartInstances.subjectChart4) {
      const ctxPie4 = document.getElementById('subjectChart4');
      if (ctxPie4) {
        const dataPie4 = {
          labels: ['Completed', 'Remaining'],
          datasets: [{
            label: 'Course Progress %',
            data: [68, 32],
            backgroundColor: ['#7B61FF', '#7b61ff29'],
            hoverOffset: 10,
            borderWidth: 2,
            borderColor: '#fff'
          }]
        };

        const configPie4 = {
          type: 'doughnut',
          data: dataPie4,
          options: {
            cutout: '70%',
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  boxWidth: 8,
                  boxHeight: 8,
                  padding: 15,
                  font: { size: 12, weight: '500' }
                }
              },
              tooltip: {
                enabled: true,
                backgroundColor: 'rgba(30, 34, 40, 0.9)',
                titleFont: { size: 6, weight: '600' },
                bodyFont: { size: 13 },
                displayColors: false,
                callbacks: {
                  label: ctx => `${ctx.label}: ${ctx.parsed}%`
                }
              }
            },
            animation: {
              animateRotate: true,
              duration: 1200
            }
          }
        };
        chartInstances.subjectChart4 = new Chart(ctxPie4, configPie4);
      }
    }

    // ===== nupur =====
    // Attendance Bar Chart
    if (!chartInstances.attendanceChart) {
      const ctxBar = document.getElementById('attendanceChart');
      if (ctxBar) {
        const dataBar = {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Attendance',
            data: [95, 88, 92, 90, 85, 78, 82],
            backgroundColor: '#7B61FF',
            borderColor: '#7B61FF',
            borderWidth: 2,
            borderRadius: 8
          }]
        };

        const configBar = {
          type: 'bar',
          data: dataBar,
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: true,
                backgroundColor: 'rgba(30, 34, 40, 0.9)',
                titleFont: { size: 12, weight: '600' },
                bodyFont: { size: 13 },
                callbacks: {
                  label: ctx => `Attendance: ${ctx.parsed.y}%`
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: function(value) {
                    return value + '%';
                  }
                }
              }
            },
            animation: {
              duration: 1200
            }
          }
        };
        chartInstances.attendanceChart = new Chart(ctxBar, configBar);
      }
    }

    // ===== nupur =====
    // Attendance Pie Chart (in attendance tab)
    if (!chartInstances.attendancePieChart) {
      const ctxPieAttendance = document.getElementById('attendancePieChart');
      if (ctxPieAttendance) {
        const dataPieAttendance = {
          labels: ['Present', 'Absent', 'Late'],
          datasets: [{
            label: 'Attendance Breakdown',
            data: [85, 10, 5],
            backgroundColor: ['#7B61FF', '#ff6b6b', '#ffd93d'],
            hoverOffset: 10,
            borderWidth: 2,
            borderColor: '#fff'
          }]
        };

        const configPieAttendance = {
          type: 'doughnut',
          data: dataPieAttendance,
          options: {
            cutout: '70%',
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  boxWidth: 8,
                  boxHeight: 8,
                  padding: 15,
                  font: { size: 12, weight: '500' }
                }
              },
              tooltip: {
                enabled: true,
                backgroundColor: 'rgba(30, 34, 40, 0.9)',
                titleFont: { size: 6, weight: '600' },
                bodyFont: { size: 13 },
                displayColors: false,
                callbacks: {
                  label: ctx => `${ctx.label}: ${ctx.parsed}%`
                }
              }
            },
            animation: {
              animateRotate: true,
              duration: 1200
            }
          }
        };
        chartInstances.attendancePieChart = new Chart(ctxPieAttendance, configPieAttendance);
      }
    }
  } catch (error) {
    console.error('Error initializing charts:', error);
  }
}

// ===== nupur =====
// Tab switching functionality for Progress section
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Show corresponding tab content
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
        // ===== nupur =====
        // Initialize charts when attendance tab is shown
        if (targetTab === 'attendance') {
          setTimeout(initializeCharts, 100);
        }
      }
    });
  });
}

// ===== nupur =====
// Initialize charts when Progress section is shown
document.addEventListener('DOMContentLoaded', function() {
  // ===== nupur =====
  // Initialize tabs
  initializeTabs();

  // ===== nupur =====
  // Initialize charts after a short delay to ensure DOM is ready
  setTimeout(initializeCharts, 100);

  // ===== nupur =====
  // Watch for section changes
  const sidebarLinks = document.querySelectorAll('#sidebar .nav-link, .mobile-navbar-bottom .nav-link[data-section]');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      // ===== nupur =====
      if (this.dataset.section === 'Progress') {
        setTimeout(() => {
          initializeCharts();
          initializeTabs();
        }, 300);
      }
    });
  });
});
























