document.addEventListener("DOMContentLoaded", function () {
  const toggleBtns = document.querySelectorAll(".toggle-password");
  toggleBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
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

  // Disable submit until required fields are filled
  const form = document.getElementById("loginForm");
  if (form) {
    const identifierInput = document.getElementById("identifier");
    const passwordInput = document.getElementById("loginPassword");
    const submitBtn = form.querySelector('button[type="submit"]');

    function isEmpty(value) {
      return !value || value.trim() === "";
    }

    function updateSubmitDisabled() {
      const disable =
        isEmpty(identifierInput && identifierInput.value) ||
        isEmpty(passwordInput && passwordInput.value);
      if (submitBtn) {
        submitBtn.disabled = !!disable;
      }
    }

    identifierInput &&
      identifierInput.addEventListener("input", updateSubmitDisabled);
    passwordInput &&
      passwordInput.addEventListener("input", updateSubmitDisabled);
    // initial state on load
    updateSubmitDisabled();
  }
});
