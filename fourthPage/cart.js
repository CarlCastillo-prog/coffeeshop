// Cart functionality
let cart = [];
let cartCount = 0;

// DOM elements
const cartIcon = document.getElementById('cart-icon');
const cartCountElement = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.querySelector('.checkout-btn');

document.addEventListener('DOMContentLoaded', function() {
    // Handle quantity buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('plus-btn')) {
            const itemWrapper = e.target.closest('.item-wrapper');
            const itemName = itemWrapper.querySelector('h4').textContent;
            const quantitySpan = e.target.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantitySpan.textContent);
            quantitySpan.textContent = quantity + 1;

            // Update cart
            const existingItem = cart.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity += 1;
                updateCartCount();
                updateCartDisplay();
            }
        } else if (e.target.classList.contains('minus-btn')) {
            const itemWrapper = e.target.closest('.item-wrapper');
            const itemName = itemWrapper.querySelector('h4').textContent;
            const quantitySpan = e.target.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantitySpan.textContent = quantity - 1;

                // Update cart
                const existingItem = cart.find(item => item.name === itemName);
                if (existingItem) {
                    existingItem.quantity -= 1;
                    updateCartCount();
                    updateCartDisplay();
                }
            } else {
                // If quantity reaches 0, remove from cart and reset
                // Remove from cart
                cart = cart.filter(item => item.name !== itemName);
                updateCartCount();
                updateCartDisplay();
                resetItemButton(itemName);
            }
        } else if (e.target.classList.contains('remove-item')) {
            const itemName = e.target.getAttribute('data-name');
            // Remove from cart
            cart = cart.filter(item => item.name !== itemName);
            updateCartCount();
            updateCartDisplay();
            resetItemButton(itemName);
        }
    });

    // Cart modal events
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });

    checkoutBtn.addEventListener('click', checkout);
});

// Add item to cart
function addToCart(name, price, quantity) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    updateCartCount();
    updateCartDisplay();
}

// Update cart count in header
function updateCartCount() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;
}

// Show quantity controls after ordering
function showQuantityControls(itemWrapper) {
    const quantityControls = itemWrapper.querySelector('.quantity-controls');
    quantityControls.classList.add('show');
}

// Open cart modal
function openCart() {
    cartModal.style.display = 'block';
    updateCartDisplay();
}

// Close cart modal
function closeCartModal() {
    cartModal.style.display = 'none';
}

// Update cart display in modal
function updateCartDisplay() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '₱0.00';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <br>
                <span>Qty: ${item.quantity}</span>
            </div>
            <div class="cart-item-price">₱${itemTotal.toFixed(2)}</div>
            <button class="remove-item" data-name="${item.name}">Remove</button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `₱${total.toFixed(2)}`;
}

// Reset item button and controls by name
function resetItemButton(itemName) {
    const itemWrappers = document.querySelectorAll('.item-wrapper');
    itemWrappers.forEach(wrapper => {
        const name = wrapper.querySelector('h4').textContent;
        if (name === itemName) {
            const orderBtn = wrapper.querySelector('.order-btn');
            const quantityControls = wrapper.querySelector('.quantity-controls');
            const quantitySpan = wrapper.querySelector('.quantity');
            orderBtn.textContent = 'Order Now';
            quantityControls.classList.remove('show');
            quantitySpan.textContent = '1';
        }
    });
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    showNotification('The order was already checked out!');
    cart = [];
    updateCartCount();
    updateCartDisplay();
    closeCartModal();

    // Refresh items: reset quantities and hide controls
    document.querySelectorAll('.quantity').forEach(span => {
        span.textContent = '1';
    });
    document.querySelectorAll('.quantity-controls').forEach(controls => {
        controls.classList.remove('show');
    });
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.textContent = 'Order Now';
    });
}

// Custom notification functions
function showNotification(message) {
    const notification = document.getElementById('custom-notification');
    const notificationMessage = document.getElementById('notification-message');
    notificationMessage.textContent = message;
    notification.style.display = 'flex';
}

function closeNotification() {
    const notification = document.getElementById('custom-notification');
    notification.style.display = 'none';
}

// Event listener for close notification button
document.addEventListener('DOMContentLoaded', function() {
    const closeNotificationBtn = document.querySelector('.close-notification');
    if (closeNotificationBtn) {
        closeNotificationBtn.addEventListener('click', closeNotification);
    }

    // Close notification when clicking outside
    const notification = document.getElementById('custom-notification');
    if (notification) {
        notification.addEventListener('click', function(e) {
            if (e.target === notification) {
                closeNotification();
            }
        });
    }
});
