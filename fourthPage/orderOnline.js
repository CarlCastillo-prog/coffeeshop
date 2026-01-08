document.addEventListener('DOMContentLoaded', function() {
    const orderButtons = document.querySelectorAll('.order-btn');

    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemWrapper = this.closest('.item-wrapper');
            const itemName = itemWrapper.querySelector('h4').textContent;
            const itemPrice = parseFloat(itemWrapper.querySelector('.price').textContent.replace('₱', ''));
            const quantity = parseInt(itemWrapper.querySelector('.quantity').textContent);

            if (this.textContent === 'Order Now') {
                addToCart(itemName, itemPrice, quantity);
                showQuantityControls(itemWrapper);
                this.textContent = 'Added';
            } else {
                // Remove from cart
                cart = cart.filter(item => item.name !== itemName);
                updateCartCount();
                updateCartDisplay();
                this.textContent = 'Order Now';
                const quantityControls = itemWrapper.querySelector('.quantity-controls');
                quantityControls.classList.remove('show');
                itemWrapper.querySelector('.quantity').textContent = '1';
            }
        });
    });
});
