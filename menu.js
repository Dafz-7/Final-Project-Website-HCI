document.addEventListener("DOMContentLoaded", () => {
  // Filtering logic
  const filterButtons = document.querySelectorAll(".filter-button");
  const cards = document.querySelectorAll(".menu-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");

      cards.forEach(card => {
        const category = card.dataset.category;
        card.style.display = (filter === "all" || category === filter) ? "flex" : "none";
      });
    });
  });

  // Add to Cart logic
  const addButtons = document.querySelectorAll(".menu-card .add-button");
  addButtons.forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".menu-card");
      const item = {
        title: card.querySelector(".menu-card-title").textContent,
        price: card.querySelector(".price").textContent,
        image: card.querySelector("img").src
      };
      addToCart(item); // from cart.js
    });
  });
});
