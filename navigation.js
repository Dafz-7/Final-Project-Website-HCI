// -------------------------------
// Mobile Sidenav Toggle
// -------------------------------
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidenav = document.getElementById("sidenav");
const closeSidenav = document.getElementById("closeSidenav");
const overlay = document.getElementById("overlay");

hamburgerBtn.addEventListener("click", () => {
  sidenav.classList.add("active");
  overlay.classList.add("active");
});

closeSidenav.addEventListener("click", () => {
  sidenav.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  sidenav.classList.remove("active");
  overlay.classList.remove("active");
});