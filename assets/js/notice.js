document.addEventListener('DOMContentLoaded', function () {
  var noticeSection = document.getElementById('NoticeSection');
  if (!noticeSection) return;

  var filterButtons = noticeSection.querySelectorAll('.filter-btn');
  var noticeItems = noticeSection.querySelectorAll('.notice-item');

  function applyFilter(filterValue) {
    noticeItems.forEach(function (item) {
      var category = item.getAttribute('data-category');
      var show = filterValue === 'all' || category === filterValue;
      var paddingDiv = item.parentElement;
      var target;
      if (paddingDiv && paddingDiv.classList.contains('p-5')) {
        target = paddingDiv;
      } else {
        target = item;
      }
      if (show) {
        target.classList.remove('d-none');
      } else {
        target.classList.add('d-none');
      }
    });
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // update active state
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filterValue = btn.getAttribute('data-filter');
      applyFilter(filterValue);
    });
  });

  // Prepare collapsible descriptions (keep width stable)
  noticeSection.querySelectorAll('.notice-card p').forEach(function (p) {
    p.classList.add('desc-collapsible', 'is-collapsed');
    p.classList.remove('text-truncate');
    // set initial max-height explicitly so first expand can animate from 1.6em
    p.style.maxHeight = '1.6em';
  });

  // Read more / Read less toggle with slide animation
  noticeSection.addEventListener('click', function (e) {
    var readMore = e.target.closest('.readmore');
    if (!readMore) return;
    e.preventDefault();

    var card = readMore.closest('.notice-card');
    if (!card) return;
    var desc = card.querySelector('p');
    if (!desc) return;

    var isCollapsed = desc.classList.contains('is-collapsed');

    if (isCollapsed) {
      // Expand: from current max-height to scrollHeight
      var targetHeight = desc.scrollHeight;
      desc.style.maxHeight = targetHeight + 'px';
      desc.classList.remove('is-collapsed');
      readMore.textContent = 'Read less';
      readMore.setAttribute('aria-expanded', 'true');
      // After transition completes, clear inline maxHeight so content can grow naturally
      var onExpandEnd = function () {
        desc.style.maxHeight = '';
        desc.removeEventListener('transitionend', onExpandEnd);
      };
      desc.addEventListener('transitionend', onExpandEnd);
    } else {
      // Collapse: set current height, then reduce to single line
      var current = desc.scrollHeight;
      desc.style.maxHeight = current + 'px';
      // force reflow
      desc.getBoundingClientRect();
      desc.style.maxHeight = '1.6em';
      desc.classList.add('is-collapsed');
      readMore.textContent = 'Read more';
      readMore.setAttribute('aria-expanded', 'false');
    }
  });

  // View button -> open modal with design-only viewers list
  noticeSection.addEventListener('click', function (e) {
    var viewBtn = e.target.closest('.view-btn');
    if (!viewBtn) return;
    e.preventDefault();

    var title = viewBtn.getAttribute('data-title') || 'Views';
    var count = parseInt(viewBtn.getAttribute('data-count') || '0', 10);

    var modalEl = document.getElementById('noticeViewsModal');
    if (!modalEl) return;
    var titleEl = document.getElementById('noticeViewsTitle');
    var countEl = document.getElementById('noticeViewsCount');
    var listEl = document.getElementById('noticeViewsList');
    if (!titleEl || !countEl || !listEl) return;

    titleEl.textContent = title;
    countEl.textContent = String(count);

    // design-only sample viewers
    var sampleNames = [
      'Arpon A.', 'John D.', 'Emily R.', 'Sophia M.', 'Liam N.', 'Olivia P.', 'Mason K.', 'Ava L.'
    ];
    listEl.innerHTML = '';
    var toShow = Math.min(count, sampleNames.length);
    for (var i = 0; i < toShow; i++) {
      var li = document.createElement('li');
      li.className = 'list-group-item d-flex align-items-center justify-content-between';
      li.innerHTML = '<span>' + sampleNames[i] + '</span><span class="badge bg-t">Viewed</span>';
      listEl.appendChild(li);
    }
    if (count > sampleNames.length) {
      var more = document.createElement('li');
      more.className = 'list-group-item text-center text-secondary';
      more.textContent = '+' + (count - sampleNames.length) + ' more';
      listEl.appendChild(more);
    }

    // open modal
    var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  });
});


