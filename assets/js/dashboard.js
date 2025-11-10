// Home dashboard JS - uses CSS variables from style.css :root
(function () {
  // Greeting based on time
  const greetingEl = document.getElementById('homeGreeting');
  const subInfoEl = document.getElementById('homeSubInfo');
  const dateEl = document.getElementById('homeDate');

  try {
    const now = new Date();
    const hours = now.getHours();
    const greeting =
      hours < 5 ? 'Good night' :
      hours < 12 ? 'Good morning' :
      hours < 17 ? 'Good afternoon' :
      'Good evening';
    if (greetingEl) greetingEl.textContent = `${greeting}`;
    if (subInfoEl) subInfoEl.textContent = 'Have a productive day of learning';
    if (dateEl) {
      const opts = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      dateEl.textContent = now.toLocaleDateString(undefined, opts);
    }
  } catch {}

  // Quick actions navigation
  function goToSection(sectionName) {
    try {
      // Prefer using the existing switchSection from main.js if available
      if (typeof window !== 'undefined' && typeof switchSection === 'function') {
        switchSection(sectionName, null);
        // also update the sidebar active state if present
        const links = document.querySelectorAll('#sidebar .nav-link');
        links.forEach(l => l.classList.toggle('active', l.dataset.section === sectionName));
        // update topbar title if available
        const topbarTitle = document.querySelector('.topbar-left span');
        if (topbarTitle) {
          let formatted = sectionName.replace(/-/g, ' ');
          formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
          topbarTitle.textContent = formatted;
        }
      } else {
        // fallback: simulate clicking the nav link
        const link = document.querySelector(`#sidebar .nav-link[data-section="${sectionName}"]`);
        link && link.click();
      }
    } catch {}
  }

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.qa-btn');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    if (action === 'open-progress') {
      goToSection('Progress');
    } else if (action === 'open-tasks') {
      goToSection('Task');
    } else if (action === 'open-notice') {
      goToSection('Notice');
    } else if (action === 'open-courses') {
      goToSection('My-course');
    }
  });
})();

// Line chart for Home dashboard (Monthly, advanced styling)
(function () {
  const canvas = document.getElementById('homeLineChart');
  if (!canvas || typeof Chart === 'undefined') return;

  // Get root colors from CSS variables
  const styles = getComputedStyle(document.documentElement);
  const scarlet400 = styles.getPropertyValue('--scarlet-400').trim() || '#fd6056';
  const scarlet500 = styles.getPropertyValue('--scarlet-500').trim() || '#f53010';
  const scarlet100 = styles.getPropertyValue('--scarlet-100').trim() || '#fed5d3';
  const textMuted = styles.getPropertyValue('--text-muted').trim() || '#777';
  const bgLight = styles.getPropertyValue('--bg-light').trim() || '#fff';

  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height || 320);
  gradient.addColorStop(0, `${scarlet100}dd`);
  gradient.addColorStop(1, `${scarlet100}00`);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Actual Study Hours',
      data: [42, 38, 45, 52, 48, 55, 60, 58, 62, 65, 63, 70],
      borderColor: scarlet500,
      backgroundColor: gradient,
      fill: true,
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: bgLight,
      pointBorderColor: scarlet400,
      pointBorderWidth: 2,
      borderWidth: 2.5
    }, {
      label: 'Target Hours',
      data: [40, 40, 44, 48, 50, 52, 56, 56, 58, 60, 62, 64],
      borderColor: '#7B61FF',
      backgroundColor: 'transparent',
      fill: false,
      tension: 0.25,
      pointRadius: 0,
      borderDash: [6, 6],
      borderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 80,
        grid: { color: 'rgba(0,0,0,0.06)', drawBorder: false },
        ticks: {
          callback: (v) => v + 'h',
          color: textMuted,
          font: { size: 11, weight: '500' },
          padding: 6
        }
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: textMuted, font: { size: 11, weight: '500' } }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          color: textMuted,
          font: { size: 12, weight: '600' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30,34,40,0.92)',
        borderColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        titleFont: { size: 12, weight: '700' },
        bodyFont: { size: 12 },
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed.y;
            if (ctx.datasetIndex === 1) return ` Target: ${value}h`;
            // Compute delta to target if available
            const target = ctx.chart.data.datasets[1].data[ctx.dataIndex];
            const delta = typeof target === 'number' ? (value - target) : 0;
            const sign = delta === 0 ? '' : (delta > 0 ? ' (+ ' : ' (- ');
            const tail = delta === 0 ? '' : `${Math.abs(delta)}h)`;
            return ` Actual: ${value}h${delta === 0 ? '' : sign}${tail}`;
          }
        }
      }
    },
    animation: { duration: 900, easing: 'easeOutQuart' },
    interaction: { mode: 'index', intersect: false }
  };

  try {
    if (window.homeLineChartInstance) {
      window.homeLineChartInstance.destroy();
    }
    window.homeLineChartInstance = new Chart(ctx, { type: 'line', data, options });
  } catch {}
})();

