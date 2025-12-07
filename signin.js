document.addEventListener("DOMContentLoaded", () => {
  const signinForm = document.querySelector(".auth-form");

  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signinForm.querySelector("input[type='email']").value.trim();
    const password = signinForm.querySelector("input[type='password']").value.trim();

    if (!email || !password) {
      showToast("Email and password are required!", false);
      return;
    }

    showToast("Signed in successfully!", true);
    // TODO: authenticate with backend
  });
});
