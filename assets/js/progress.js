

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
           backgroundColor: ['#d3280c','#fed5d3'],
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
            backgroundColor: ['#d3280c','#fed5d3'],
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
            backgroundColor: ['#d3280c','#fed5d3'],
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

    // 🧠 1️⃣ Custom positioner + caret flipping
    Chart.Tooltip.positioners.smartArc = function (elements, eventPosition) {
      if (!elements.length) return false;
      const { element } = elements[0];
      const { x, y } = element;
      const label = element.$context.label;

      // decide tooltip direction and vertical offset
      let offsetY = 58;
      if (label === 'Completed') {
        offsetY = 55;   // show below
        element.$context.chart.tooltip.options.yAlign = 'top'; // caret points UP
      } else if (label === 'Remaining') {
        offsetY = 100;  // show above
        element.$context.chart.tooltip.options.yAlign = 'bottom'; // caret points DOWN
      }

      return { x: x, y: y + offsetY };
    };

    // 🧾 2️⃣ Data (same as before)
    const dataPie4 = {
      labels: ['Completed', 'Remaining'],
      datasets: [{
        label: 'Course Progress %',
        data: [68, 32],
        backgroundColor: ['#d3280c', '#fed5d3'],
        hoverOffset: 10,
        borderWidth: 2,
        borderColor: '#fff'
      }]
    };

    // ⚙️ 3️⃣ Config with smart tooltip
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
            position: 'smartArc', // 🧭 custom positioner
            backgroundColor: 'rgba(30, 34, 40, 0.9)',
            titleFont: { size: 6, weight: '600' },
            bodyFont: { size: 13 },
            displayColors: false,
            padding: 8,
            caretSize: 6, // visible arrow
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

    // 🪄 4️⃣ Create chart
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
            backgroundColor: '#d3280c',
            borderColor: '#d3280c',
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
                bodyFont: { size: 15 },
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


//exam-result-chart

const ctx = document.getElementById("examResultChart").getContext("2d");

    const labels = ["Class Test", "Quiz Test", "Mid-Term", "Final Semester"];

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Actual Marks",
          data: [68, 72, 77, 85],
          borderColor: "#f43f5e",
          backgroundColor: "rgba(244,63,94,0.15)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#f43f5e",
          pointBorderWidth: 2,
        },
        {
          label: "Target Marks",
          data: [70, 75, 80, 90],
          borderColor: "#6366f1",
          borderDash: [6, 6],
          backgroundColor: "transparent",
          fill: false,
          tension: 0.4,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#6366f1",
          pointBorderWidth: 2,
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.dataset.label || "";
              return `${label}: ${context.parsed.y} marks`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 100,
          title: {
            display: true,
            text: "Marks",
          },
        },
      },
    };

    new Chart(ctx, {
      type: "line",
      data: data,
      options: options,
    });
