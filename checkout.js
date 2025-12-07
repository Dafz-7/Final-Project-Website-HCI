// checkout.js
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const deliveryEl = document.getElementById("delivery");
  const totalEl = document.getElementById("total");
  const placeOrderBtn = document.getElementById("placeOrderBtn");

  let cart = getCart(); // comes from cart.js

  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.dataset.index = index; // store index for removeFromCart

        div.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="item-image" />
          <div class="item-details">
            <div class="item-name">${item.title}</div>
            <div class="item-price">${item.price}</div>
          </div>
          <div class="quantity-controls">
            <button class="quantity-btn minus-btn">-</button>
            <span class="quantity-value">${item.quantity || 1}</span>
            <button class="quantity-btn plus-btn">+</button>
          </div>
          <button class="delete-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6
                      m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        `;

        // Plus button
        div.querySelector(".plus-btn").addEventListener("click", () => {
          item.quantity = (item.quantity || 1) + 1;
          saveCart(cart);
          renderCart();
        });

        // Minus button
        div.querySelector(".minus-btn").addEventListener("click", () => {
          if ((item.quantity || 1) > 1) {
            item.quantity -= 1;
            saveCart(cart);
            renderCart();
          } else {
            removeFromCart(index); // centralized remove + toast
            cart = getCart();
            renderCart();
          }
        });

        // Delete button
        div.querySelector(".delete-btn").addEventListener("click", () => {
          removeFromCart(index); // centralized remove + toast
          cart = getCart();
          renderCart();
        });

        cartItemsContainer.appendChild(div);
      });
    }

    updateCartBadge(cart);
    updateSummary();
  }

  function updateSummary() {
    let subtotal = 0;
    cart.forEach(item => {
      const price = parseFloat(item.price.replace("$", ""));
      subtotal += price * (item.quantity || 1);
    });

    const tax = subtotal * 0.1;
    const delivery = cart.length > 0 ? 2.99 : 0;
    const total = subtotal + tax + delivery;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    deliveryEl.textContent = `$${delivery.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  }

  // Place order button
  placeOrderBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty!", false);
      return;
    }

    const paymentMethod = document.querySelector("input[name='payment']:checked").value;
    if (paymentMethod === "card") {
      const cardNumber = document.getElementById("cardNumber").value.trim();
      const expiryDate = document.getElementById("expiryDate").value.trim();
      const cvv = document.getElementById("cvv").value.trim();

      // Empty check
      if (!cardNumber || !expiryDate || !cvv) {
        showToast("Please complete card details!", false);
        return;
      }

      // Card number: must be 16 digits
      if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ""))) {
        showToast("Invalid card number!", false);
        return;
      }

      // Expiry date: MM/YY format, valid month 01–12
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        showToast("Invalid expiry date format (MM/YY)!", false);
        return;
      }

      // CVV: must be 3 digits
      if (!/^\d{3}$/.test(cvv)) {
        showToast("Invalid CVV!", false);
        return;
      }
    }

    // Success
    showToast("Order placed successfully!", true);
    clearCart();
    cart = getCart();
    renderCart();
  });

  renderCart();
});
