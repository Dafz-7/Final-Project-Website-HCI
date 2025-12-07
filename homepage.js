document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".dish-card .add-button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".dish-card");
      const item = {
        title: card.querySelector("h3").textContent,
        price: card.querySelector("p").textContent.split("—")[1].trim(), // extract price
        image: card.querySelector("img").src
      };
      addToCart(item); // from cart.js
    });
  });
});
