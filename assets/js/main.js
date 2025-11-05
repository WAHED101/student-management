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
})();

// Validation disabled as requested
(function () {
  const form =
    document.getElementById("signupForm") || document.querySelector("form");
  if (!form) return;
  // intentionally no-op: no input listeners, no submit prevention, no error styling
})();

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
const sidebare = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleSidebarBtn");
const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
const tooltipList = tooltipTriggerList.map((el) => new bootstrap.Tooltip(el));

if (toggleBtn && sidebare) {
  toggleBtn.addEventListener("click", () => {
    sidebare.classList.toggle("collapsed");
    toggleBtn.classList.toggle("rotate");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const sidebarLinks = document.querySelectorAll("#sidebar .nav-link");
  const sections = document.querySelectorAll(".content-section");

  if (sidebarLinks.length > 0 && sections.length > 0) {
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        sidebarLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");

        sections.forEach((section) => section.classList.add("d-none"));

        const sectionId = this.dataset.section + "Section";
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.classList.remove("d-none");
        }
      });
    });
  }
});
