document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector(".auth-form");

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = signupForm.querySelector("input[placeholder='Full Name']").value.trim();
    const email = signupForm.querySelector("input[type='email']").value.trim();
    const password = signupForm.querySelector("input[placeholder='Password']").value.trim();
    const confirm = signupForm.querySelector("input[placeholder='Confirm Password']").value.trim();

    if (!name || !email || !password || !confirm) {
      showToast("Please complete all fields!", false);
      return;
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      showToast("Invalid email format!", false);
      return;
    }

    if (password !== confirm) {
      showToast("Passwords do not match!", false);
      return;
    }

    // Success toast
    showToast("Account created successfully!", true);

    // Redirect after 2 seconds (so user sees the toast)
    setTimeout(() => {
      window.location.href = "signin.html";
    }, 1000);
  });
});
