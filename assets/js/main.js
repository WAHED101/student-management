/* ========================
       BAR CHART (Attendance %)
    =========================*/
    // const ctxBar = document.getElementById('attendanceChart').getContext('2d');

    // const labelsBar = [
    //   '1','2','3','4','5','6','7','8','9','10',
    //   '11','12','13','14','15','16','17','18','19','20',
    //   '21','22','23','24','25','26','27','28','29','30'
    // ];

    // const dataBar = {
    //   labels: labelsBar,
    //   datasets: [{
    //     label: 'Attendance (%)',
    //     data: [
    //       90, 85, 92, 95, 100, 88, 91, 85, 93, 97,
    //       92, 89, 94, 100, 86, 90, 92, 88, 96, 91,
    //       95, 89, 90, 92, 97, 94, 88, 90, 93, 95
    //     ],
    //     backgroundColor: 'rgba(123, 97, 255, 0.7)',
    //     borderColor: '#7B61FF',
    //     borderWidth: 2,
    //     borderRadius: 4,
    //     hoverBackgroundColor: '#5A3FFF',
    //   }]
    // };

    // const configBar = {
    //   type: 'bar',
    //   data: dataBar,
    //   options: {
    //     responsive: false,
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //         max: 100,
    //         ticks: {
    //           stepSize: 20,
    //           callback: value => value + '%'
    //         },
    //         title: {
    //           display: true,
    //           text: 'Attendance %'
    //         }
    //       },
    //       x: {
    //         title: {
    //           display: true,
    //           text: 'Day'
    //         },
    //         ticks: {
    //           autoSkip: true,
    //           maxRotation: 0,
    //           minRotation: 0
    //         }
    //       }
    //     },
    //     plugins: {
    //       legend: { display: false },
    //       tooltip: {
    //         enabled: true,
    //         displayColors: false,
    //         callbacks: {
    //           label: ctx => `Day ${ctx.label}: ${ctx.parsed.y}%`
    //         }
    //       }
    //     }
    //   }
    // };

    // new Chart(ctxBar, configBar);


    /* ==========================
       DOUGHNUT CHART (Subjects)
    ===========================*/
   const ctxPie = document.getElementById('subjectChart').getContext('2d');

const dataPie = {
   labels: ['Presence','Absence',],
  datasets: [{
    label: 'Attendance %',
    data: [ 95, 85],
    backgroundColor: [
      '#7B61FF', 
      
      '#7b61ff29'
    ],
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
           boxWidth: 8,        // circle size
           boxHeight: 8,       // for better balance
           padding: 15,        // space between items
           font: { size: 12, weight: '500'}
           
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

new Chart(ctxPie, configPie);




//2nd chart***********

const ctxPie2 = document.getElementById('subjectChart2').getContext('2d');

const dataPie2 = {
  labels: ['Presence','Absence',],
  datasets: [{
    label: 'Attendance %',
    data: [ 95, 85],
    backgroundColor: [
      '#7B61FF', 
      
      '#7b61ff29'
    ],
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
           boxWidth: 8,        // circle size
           boxHeight: 8,       // for better balance
           padding: 15,        // space between items
           font: { size: 12, weight: '500'}
           
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
new Chart(ctxPie2, configPie2);

//3rd chart***********

const ctxPie3 = document.getElementById('subjectChart3').getContext('2d');

const dataPie3 = {
  labels: ['Presence','Absence',],
  datasets: [{
    label: 'Attendance %',
    data: [ 95, 85],
    backgroundColor: [
      '#7B61FF', 
      
      '#7b61ff29'
    ],
    hoverOffset: 10,
    borderWidth: 2,
    borderColor: '#fff'
  }]
};

const configPie3 = {
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
           boxWidth: 8,        // circle size
           boxHeight: 8,       // for better balance
           padding: 15,        // space between items
           font: { size: 12, weight: '500'}
           
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
new Chart(ctxPie3, configPie3);

//4th chart***********

const ctxPie4 = document.getElementById('subjectChart4').getContext('2d');

const dataPie4 = {
  labels: ['Presence','Absence',],
  datasets: [{
    label: 'Attendance %',
    data: [ 95, 85],
    backgroundColor: [
      '#7B61FF', 
      
      '#7b61ff29'
    ],
    hoverOffset: 10,
    borderWidth: 2,
    borderColor: '#fff'
  }]
};

const configPie4 = {
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
           boxWidth: 8,        // circle size
           boxHeight: 8,       // for better balance
           padding: 15,        // space between items
           font: { size: 12, weight: '500'}
           
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
new Chart(ctxPie4, configPie4);

//tab-section***************************
const tabBtns = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
      });
    });

//exam chart
// const ctx = document.getElementById('examChart').getContext('2d');
//     const examChart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['Midterm', 'Final', 'Quiz 1', 'Quiz 2', 'Project'],
//         datasets: [{
//           label: 'Average Marks',
//           data: [72, 85, 60, 78, 90],
//           backgroundColor: [
//             '#a78bfa', // light purple
//             '#c084fc',
//             '#93c5fd',
//             '#818cf8',
//             '#7dd3fc'
//           ],
//           borderRadius: 8,
//           barThickness: 40,
//         }]
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             beginAtZero: true,
//             max: 100,
//             title: {
//               display: true,
//               text: 'Average Marks'
//             }
//           },
//           x: {
//             title: {
//               display: true,
//               text: 'Exam Name'
//             }
//           }
//         },
//         plugins: {
//           legend: {
//             display: false
//           },
//           tooltip: {
//             backgroundColor: '#5a4fcf',
//             titleColor: '#fff',
//             bodyColor: '#fff'
//           }
//         }
//       }
//     });

    //line-chart for project review
  //  const ctxline = document.getElementById("projectReviewChart").getContext("2d");

  //   const projectReviewChart = new Chart(ctxline, {
  //     type: "line",
  //     data: {
  //       labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
  //       datasets: [
  //         {
  //           label: "Review Score",
  //           data: [60, 75, 82, 70, 90, 85, 95],
  //           borderColor: "#8a56f0",
  //           backgroundColor: "rgba(138, 86, 240, 0.2)",
  //           fill: true,
  //           tension: 0.4,
  //           pointBackgroundColor: "#8a56f0",
  //           pointBorderColor: "#fff",
  //           pointRadius: 5,
  //           pointHoverRadius: 7,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: { display: false },
  //         tooltip: {
  //           backgroundColor: "#fff",
  //           titleColor: "#333",
  //           bodyColor: "#333",
  //           borderColor: "#8a56f0",
  //           borderWidth: 1,
  //           bodyFont: { size: 13 },
  //           titleFont: { weight: "bold" },
  //         },
  //       },
  //       scales: {
  //         x: {
  //           grid: { display: false },
  //           ticks: { color: "#888" },
  //         },
  //         y: {
  //           grid: { color: "#eee" },
  //           ticks: { color: "#888", stepSize: 20 },
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });


    //extracurricular activities chart
//       const ctxex = document.getElementById("activitiesPieChart").getContext("2d");

//     const activitiesPieChart = new Chart(ctxex, {
//       type: "pie",
//       data: {
//         labels: ["Sports", "Music", "Art", "Debate"],
//         datasets: [
//           {
//             data: [35, 25, 20, 20],
//             backgroundColor: [
//               "#7B61FF",   // Sports
//               "#7b61ffbb",   // Music
//               "#7b61ff75",   // Art
//               "#7b61ff29",   // Debate
//             ],
//             borderColor: "#fff",
//             borderWidth: 4,
//             hoverOffset: 10,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: "bottom",
//             labels: {
//               color: "#555",
//               usePointStyle: true,
//               pointStyle: "circle",
//               font: { size: 13 },
//             },
//           },
//           tooltip: {
//             backgroundColor: "#fff",
//             titleColor: "#333",
//             bodyColor: "#555",
//             borderColor: "#ccc",
//             borderWidth: 1,
//             bodyFont: { size: 13 },
//             titleFont: { weight: "bold" },
//             displayColors: true,
//             callbacks: {
//               label: (context) =>
//                 `${context.label}: ${context.formattedValue}%`,
//             },
//           },
//         },
//       },
//     });

// document.addEventListener('DOMContentLoaded', function () {

//   const sidebare = document.getElementById("sidebar");
//   const toggleBtn = document.getElementById("toggleSidebarBtn");
//   const tooltipTriggerList = [].slice.call(
//     document.querySelectorAll('[data-bs-toggle="tooltip"]')
//   );


//   if (toggleBtn && sidebare) {
//     toggleBtn.addEventListener('click', () => {
//       sidebare.classList.toggle('collapsed');
//       toggleBtn.classList.toggle('rotate');
//     });
//   }

// });

// Password visibility toggle
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

  // Validation disabled as requested
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
      // const valueEmpty = inp.value.trim() === '';
      // const shouldShow = force || inp.dataset.touched === 'true';
      // const group = inp.parentElement;
      // if (!valueEmpty){
      //   inp.classList.remove('is-invalid');
      //   if (group) group.classList.remove('has-error');
      //   return;
      // }
      // if (shouldShow){
      //   inp.classList.add('is-invalid');
      //   if (group) group.classList.add('has-error');
      // } else {
      //   inp.classList.remove('is-invalid');
      //   if (group) group.classList.remove('has-error');
      // }
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
};
  

 ///chart

 const ctx1 = document.getElementById('attendanceChart').getContext('2d');

    const labels = [
      '1','2','3','4','5','6','7','8','9','10',
      '11','12','13','14','15','16','17','18','19','20',
      '21','22','23','24','25','26','27','28','29','30'
    ];

    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Attendance (%)',
          data: [
            90, 85, 92, 95, 100, 88, 91, 85, 93, 97,
            92, 89, 94, 100, 86, 90, 92, 88, 96, 91,
            95, 89, 90, 92, 97, 94, 88, 90, 93, 95
          ],
          backgroundColor: 'rgba(123, 97, 255, 0.7)',
          borderColor: '#7B61FF',
          borderWidth: 2,
          borderRadius: 4,
          hoverBackgroundColor: '#5A3FFF',
        }]
      },
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: value => value + '%'
            },
            title: {
              display: true,
              text: 'Attendance %'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Day'
            },
            ticks: {
              autoSkip: true,
              maxRotation: 0,
              minRotation: 0
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            callbacks: {
              label: ctx => ctx.parsed.y + '%'
            }
          }
        }
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
