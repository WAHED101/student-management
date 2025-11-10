// Teacher Review interactivity: filter, sort, paginate, star ratings, submit
(function () {
  const list = document.getElementById('trList');
  if (!list) return;

  const searchInput = document.getElementById('trSearch');
  const subjectSelect = document.getElementById('trSubject');
  const sortSelect = document.getElementById('trSort');
  const countEl = document.getElementById('trCount');
  const avgEl = document.getElementById('trAvg');
  const totalEl = document.getElementById('trTotal');
  const prevBtn = document.getElementById('trPrev');
  const nextBtn = document.getElementById('trNext');
  const form = document.getElementById('trForm');
  const formTeacher = document.getElementById('trFormTeacher');
  const formSubject = document.getElementById('trFormSubject');
  const formStars = document.getElementById('trFormStars');
  const formText = document.getElementById('trFormText');

  const pageSize = 5;
  let currentPage = 1;

  const reviews = () => Array.from(list.querySelectorAll('.tr-card'));

  function normalize(s) {
    return (s || '').toString().toLowerCase().trim();
  }

  function renderStars(container, value) {
    container.innerHTML = '';
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    for (let i = 1; i <= 5; i++) {
      const icon = document.createElement('i');
      if (i <= full) icon.className = 'fa-solid fa-star';
      else if (i === full + 1 && half) icon.className = 'fa-solid fa-star-half-stroke';
      else icon.className = 'fa-regular fa-star';
      container.appendChild(icon);
    }
  }

  // Initialize existing stars
  reviews().forEach((r) => {
    const v = Number(r.getAttribute('data-rating') || 0);
    const stars = r.querySelector('.tr-stars');
    if (stars) renderStars(stars, v);
  });

  function applyFilters() {
    const q = normalize(searchInput?.value || '');
    const sub = subjectSelect?.value || 'all';
    reviews().forEach((r) => {
      const teacher = normalize(r.getAttribute('data-teacher'));
      const subject = r.getAttribute('data-subject');
      const text = normalize(r.querySelector('.tr-text')?.textContent);
      const matches =
        (sub === 'all' || subject === sub) && (teacher.includes(q) || text.includes(q));
      r.style.display = matches ? '' : 'none';
    });
  }

  function applySort() {
    const mode = sortSelect?.value || 'recent';
    const visible = reviews().filter((r) => r.style.display !== 'none');
    const byDate = (a, b) =>
      new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
    const byRating = (a, b) =>
      Number(b.getAttribute('data-rating')) - Number(a.getAttribute('data-rating'));
    const byTeacher = (a, b) =>
      normalize(a.getAttribute('data-teacher')).localeCompare(
        normalize(b.getAttribute('data-teacher'))
      );
    if (mode === 'recent') visible.sort(byDate);
    else if (mode === 'rating') visible.sort(byRating);
    else if (mode === 'a2z') visible.sort(byTeacher);
    else if (mode === 'z2a') visible.sort((a, b) => byTeacher(b, a));
    const frag = document.createDocumentFragment();
    visible.forEach((n) => frag.appendChild(n));
    list.appendChild(frag);
  }

  function paginate() {
    const visible = reviews().filter((r) => r.style.display !== 'none');
    const total = visible.length;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    if (currentPage > pages) currentPage = pages;
    visible.forEach((r, i) => {
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      r.style.display = i >= start && i < end ? '' : 'none';
    });
    if (countEl) countEl.textContent = `Showing ${Math.min(total, (currentPage - 1) * pageSize + 1)}-${Math.min(total, currentPage * pageSize)} of ${total}`;
    prevBtn?.toggleAttribute('disabled', currentPage <= 1);
    nextBtn?.toggleAttribute('disabled', currentPage >= pages);
  }

  function updateSummary() {
    const all = reviews();
    const vals = all.map((r) => Number(r.getAttribute('data-rating') || 0));
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    avgEl && (avgEl.textContent = avg.toFixed(1));
    totalEl && (totalEl.textContent = `Based on ${vals.length} reviews`);
    const sumStars = document.querySelector('.tr-summary .tr-stars');
    if (sumStars) renderStars(sumStars, avg);
  }

  function refresh() {
    applyFilters();
    applySort();
    currentPage = 1;
    paginate();
    updateSummary();
  }

  searchInput?.addEventListener('input', refresh);
  subjectSelect?.addEventListener('change', refresh);
  sortSelect?.addEventListener('change', () => {
    applySort();
    paginate();
  });
  prevBtn?.addEventListener('click', () => {
    currentPage = Math.max(1, currentPage - 1);
    paginate();
  });
  nextBtn?.addEventListener('click', () => {
    currentPage += 1;
    paginate();
  });

  // Helpful (demo)
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="helpful"]');
    if (!btn) return;
    btn.textContent = 'Thanks!';
    btn.setAttribute('disabled', 'true');
  });

  // Star input
  if (formStars) {
    formStars.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-star';
      icon.addEventListener('mouseenter', () => highlight(i));
      icon.addEventListener('click', () => setValue(i));
      formStars.appendChild(icon);
    }
    formStars.addEventListener('mouseleave', () => highlight(Number(formStars.dataset.value || 0)));
    function highlight(n) {
      Array.from(formStars.children).forEach((c, idx) => {
        c.classList.toggle('active', idx < n);
      });
    }
    function setValue(n) {
      formStars.dataset.value = String(n);
      highlight(n);
    }
    highlight(0);
  }

  // Submit review
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const teacher = formTeacher.value.trim();
    const subject = formSubject.value;
    const rating = Number(formStars?.dataset.value || 0);
    const text = formText.value.trim();
    if (!teacher || !subject || !rating || !text) return;
    const item = document.createElement('article');
    item.className = 'tr-card';
    item.setAttribute('data-teacher', teacher);
    item.setAttribute('data-subject', subject);
    item.setAttribute('data-rating', String(rating));
    item.setAttribute('data-date', new Date().toISOString().slice(0, 10));
    item.innerHTML = `
      <div class="tr-card-head d-flex justify-content-between align-items-start">
        <div>
          <h6 class="m-0 tr-teacher">${teacher}</h6>
          <span class="tr-subject">${subject.charAt(0).toUpperCase() + subject.slice(1)}</span>
        </div>
        <div class="tr-stars" aria-label="${rating} stars"></div>
      </div>
      <p class="tr-text"></p>
      <div class="tr-meta">
        <span class="tr-date">Just now</span>
        <button class="btn tr-btn-ghost" data-action="helpful">Helpful</button>
      </div>`;
    item.querySelector('.tr-text').textContent = text;
    list.prepend(item);
    renderStars(item.querySelector('.tr-stars'), rating);
    form.reset();
    if (formStars) formStars.dataset.value = '0';
    refresh();
  });

  // Initial
  refresh();
})(); 

