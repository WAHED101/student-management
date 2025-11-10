// Payment interactivity: input formatting, totals, promo, filters, saved method selection
(function () {
  const amountInput = document.getElementById('payAmount');
  const promoInput = document.getElementById('promoCode');
  const promoBtn = document.getElementById('applyPromo');
  const promoMsg = document.getElementById('promoMsg');
  const subtotalEl = document.getElementById('sumSubtotal');
  const discountEl = document.getElementById('sumDiscount');
  const totalEl = document.getElementById('sumTotal');
  const payBtn = document.getElementById('payNow');
  const filterSelect = document.getElementById('payFilter');
  const sortSelect = document.getElementById('paySort');
  const historyList = document.getElementById('payHistory');
  const savedMethods = document.getElementById('savedMethods');
  const numInput = document.getElementById('cardNumber');
  const expInput = document.getElementById('cardExpiry');
  const cvcInput = document.getElementById('cardCvc');
  const nameInput = document.getElementById('cardName');

  if (!amountInput) return;

  let discountPct = 0;

  function fmt(n) {
    const v = Number(n || 0);
    return `$${v.toFixed(2)}`;
  }

  function syncTotals() {
    const sub = Math.max(0, Number(amountInput.value || 0));
    const disc = sub * discountPct;
    const total = Math.max(0, sub - disc);
    subtotalEl.textContent = fmt(sub);
    discountEl.textContent = `-${fmt(disc)}`;
    totalEl.textContent = fmt(total);
  }

  amountInput.addEventListener('input', syncTotals);

  // Promo codes demo
  promoBtn?.addEventListener('click', () => {
    const code = (promoInput.value || '').trim().toUpperCase();
    if (!code) {
      promoMsg.textContent = 'Enter a promo code.';
      return;
    }
    if (code === 'SAVE10') {
      discountPct = 0.1;
      promoMsg.textContent = 'Promo applied: 10% off';
    } else if (code === 'SAVE25') {
      discountPct = 0.25;
      promoMsg.textContent = 'Promo applied: 25% off';
    } else {
      discountPct = 0;
      promoMsg.textContent = 'Invalid code';
    }
    syncTotals();
  });

  // Card formatting
  numInput?.addEventListener('input', () => {
    let digits = numInput.value.replace(/\D/g, '').slice(0, 16);
    numInput.value = digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  });
  expInput?.addEventListener('input', () => {
    let d = expInput.value.replace(/\D/g, '').slice(0, 4);
    if (d.length >= 3) d = d.slice(0, 2) + '/' + d.slice(2);
    expInput.value = d;
  });
  cvcInput?.addEventListener('input', () => {
    cvcInput.value = cvcInput.value.replace(/\D/g, '').slice(0, 4);
  });

  // Saved method selection
  savedMethods?.addEventListener('click', (e) => {
    const li = e.target.closest('.pay-method');
    if (!li) return;
    savedMethods.querySelectorAll('.pay-method').forEach((el) => el.classList.remove('active'));
    li.classList.add('active');
    const brand = li.getAttribute('data-brand');
    const last4 = li.getAttribute('data-last4');
    nameInput.value = nameInput.value || 'Saved User';
    numInput.value = `${brand === 'visa' ? '4242 4242 4242' : '5555 5555 5555'} ${last4}`;
    expInput.value = '12/30';
    cvcInput.value = '123';
  });

  // History filtering/sorting
  function items() {
    return Array.from(historyList.querySelectorAll('.pay-history-item'));
  }
  function applyHistoryFilter() {
    const f = filterSelect.value;
    items().forEach((it) => {
      const st = it.getAttribute('data-status');
      it.style.display = f === 'all' || f === st ? '' : 'none';
    });
  }
  function applyHistorySort() {
    const s = sortSelect.value;
    const visible = items().filter((it) => it.style.display !== 'none');
    if (s === 'amount') {
      visible.sort(
        (a, b) =>
          Number(b.getAttribute('data-amount')) - Number(a.getAttribute('data-amount'))
      );
    } else {
      visible.sort(
        (a, b) =>
          new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'))
      );
    }
    const frag = document.createDocumentFragment();
    visible.forEach((n) => frag.appendChild(n));
    historyList.appendChild(frag);
  }
  filterSelect?.addEventListener('change', () => {
    applyHistoryFilter();
    applyHistorySort();
  });
  sortSelect?.addEventListener('change', applyHistorySort);

  // Pay button (demo)
  payBtn?.addEventListener('click', () => {
    const errors = [];
    if (!nameInput.value.trim()) errors.push('Cardholder name is required.');
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(numInput.value)) errors.push('Enter a valid card number.');
    if (!/^\d{2}\/\d{2}$/.test(expInput.value)) errors.push('Enter expiry as MM/YY.');
    if (!/^\d{3,4}$/.test(cvcInput.value)) errors.push('Enter a valid CVC.');
    if (!Number(amountInput.value)) errors.push('Enter an amount.');
    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }
    alert('Payment processed (demo).');
    // Append to history
    const li = document.createElement('li');
    li.className = 'pay-history-item';
    const amt = Math.max(0, Number(amountInput.value || 0) * (1 - discountPct)).toFixed(2);
    li.setAttribute('data-status', 'success');
    li.setAttribute('data-amount', amt);
    li.setAttribute('data-date', new Date().toISOString().slice(0, 10));
    li.innerHTML = `<span><i class="fa-regular fa-circle-check text-success"></i> Payment</span><strong>$${amt}</strong>`;
    historyList.prepend(li);
    applyHistoryFilter();
    applyHistorySort();
  });

  // Init
  syncTotals();
  applyHistoryFilter();
  applyHistorySort();
})(); 

