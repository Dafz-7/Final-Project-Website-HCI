// cart.js

// -------------------- TOAST FUNCTION --------------------
function showToast(message, success = true) {
  // Ensure container exists
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  // Create toast
  const toast = document.createElement("div");
  toast.className = "toast";

  const content = document.createElement("div");
  content.className = "toast-content";

  const icon = document.createElement("span");
  icon.className = "toast-icon";
  if (success) {
    icon.classList.add("active", "toast-success");
    icon.textContent = "✔";
  } else {
    icon.classList.add("active", "toast-error");
    icon.textContent = "✖";
  }

  const msg = document.createElement("span");
  msg.className = "toast-message";
  msg.textContent = message;

  content.appendChild(icon);
  content.appendChild(msg);
  toast.appendChild(content);
  container.appendChild(toast);

  // Animate in
  setTimeout(() => toast.classList.add("show"), 100);

  // Auto remove after 3s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// -------------------- CART FUNCTIONS --------------------

// Get cart from localStorage or initialize empty
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart back to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge(cart);
}

// Add item to cart
function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
  showToast("Item added to cart!", true);
}

// Remove item from cart by index
function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
    showToast("Item removed from cart!", false);
  }
}

// Update cart badge count
function updateCartBadge(cart = getCart()) {
  const badge = document.querySelector(".cart-badge");
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    badge.textContent = totalItems;
  }
}

// Clear cart
function clearCart() {
  localStorage.removeItem("cart");
  updateCartBadge([]);
  showToast("Cart cleared!", false);
}

// -------------------- INIT --------------------
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
});
