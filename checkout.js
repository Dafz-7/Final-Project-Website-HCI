// Cart data
let cartItems = [
  {
    id: 1,
    name: "Grilled Chicken Bowl",
    unitPrice: 12.98,
    quantity: 2,
    image: "https://placehold.co/140x140?text=Grilled+chicken+bowl+with+fresh+vegetables+on+white+plate",
  },
  {
    id: 2,
    name: "Classic Burger",
    unitPrice: 8.98,
    quantity: 1,
    image: "https://placehold.co/140x140?text=Classic+burger+with+lettuce+tomato+cheese+and+beef+patty",
  },
]

const deliveryFee = 2.99
const taxRate = 0.1

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderCartItems()
  updateOrderSummary()
  updateCartBadge() // Update cart badge on page load
  setupEventListeners()
})

// Render cart items
function renderCartItems() {
  const cartContainer = document.getElementById("cartItems")
  cartContainer.innerHTML = ""

  cartItems.forEach((item) => {
    const cartItemEl = document.createElement("div")
    cartItemEl.className = "cart-item"
    const itemTotal = item.unitPrice * item.quantity
    cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${itemTotal.toFixed(2)}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
            </div>
            <button class="delete-btn" onclick="removeItem(${item.id})">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        `
    cartContainer.appendChild(cartItemEl)
  })
}

// Increase quantity
function increaseQuantity(itemId) {
  const item = cartItems.find((i) => i.id === itemId)
  if (item) {
    item.quantity++
    renderCartItems()
    updateOrderSummary()
    updateCartBadge() // Update cart badge when quantity increases
  }
}

// Decrease quantity
function decreaseQuantity(itemId) {
  const item = cartItems.find((i) => i.id === itemId)
  if (item && item.quantity > 1) {
    item.quantity--
    renderCartItems()
    updateOrderSummary()
    updateCartBadge() // Update cart badge when quantity decreases
  }
}

// Remove item
function removeItem(itemId) {
  cartItems = cartItems.filter((i) => i.id !== itemId)
  renderCartItems()
  updateOrderSummary()
  updateCartBadge()
}

// Update order summary
function updateOrderSummary() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const tax = subtotal * taxRate
  const total = subtotal + tax + deliveryFee

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`
  document.getElementById("tax").textContent = `$${tax.toFixed(2)}`
  document.getElementById("delivery").textContent = `$${deliveryFee.toFixed(2)}`
  document.getElementById("total").textContent = `$${total.toFixed(2)}`
}

// Update cart badge
function updateCartBadge() {
  const badge = document.querySelector(".cart-badge")
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  badge.textContent = totalItems
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast")
  const toastMessage = document.getElementById("toastMessage")
  const successIcon = document.getElementById("toastSuccessIcon")
  const errorIcon = document.getElementById("toastErrorIcon")

  toastMessage.textContent = message

  // Show appropriate icon based on type
  if (type === "success") {
    successIcon.classList.add("active")
    errorIcon.classList.remove("active")
  } else if (type === "error") {
    errorIcon.classList.add("active")
    successIcon.classList.remove("active")
  }

  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 1500)
}

// Setup event listeners
function setupEventListeners() {
  // Payment method toggle
  const paymentOptions = document.querySelectorAll('input[name="payment"]')
  const cardDetails = document.getElementById("cardDetails")

  paymentOptions.forEach((option) => {
    option.addEventListener("change", (e) => {
      if (e.target.value === "card") {
        cardDetails.classList.remove("hidden")
      } else {
        cardDetails.classList.add("hidden")
      }
    })
  })

  // Card number formatting
  const cardNumberInput = document.getElementById("cardNumber")
  cardNumberInput.addEventListener("input", (e) => {
    const value = e.target.value.replace(/\s/g, "")
    const formattedValue = value.match(/.{1,4}/g)?.join(" ") || value
    e.target.value = formattedValue
  })

  // Expiry date formatting
  const expiryDateInput = document.getElementById("expiryDate")
  expiryDateInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4)
    }
    e.target.value = value
  })

  // CVV number only
  const cvvInput = document.getElementById("cvv")
  cvvInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "")
  })

  // Place order button
  const placeOrderBtn = document.getElementById("placeOrderBtn")
  placeOrderBtn.addEventListener("click", () => {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value

    if (paymentMethod === "card") {
      const cardNumber = document.getElementById("cardNumber").value
      const expiryDate = document.getElementById("expiryDate").value
      const cvv = document.getElementById("cvv").value

      if (!cardNumber || !expiryDate || !cvv) {
        showToast("Please fill in all card details", "error")
        return
      }
    }

    showToast("Order placed successfully!", "success")
    // In a real app, you would send the order to the backend here
  })
}