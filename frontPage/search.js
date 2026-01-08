document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const menuCards = document.querySelectorAll('.menu .card1, .menu .card2, .menu .card3, .menu .card4, .menu .card5, .menu .card6, .menu .card7, .menu .card8');
    const menuContainer = document.querySelector('.menu');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        menuCards.forEach(card => {
            const itemName = card.querySelector('h4').textContent.toLowerCase();

            if (itemName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Hide the menu section if no items are visible
        const visibleCards = menuContainer.querySelectorAll('.card1[style*="display: block"], .card2[style*="display: block"], .card3[style*="display: block"], .card4[style*="display: block"], .card5[style*="display: block"], .card6[style*="display: block"], .card7[style*="display: block"], .card8[style*="display: block"]');
        if (visibleCards.length === 0 && searchTerm !== '') {
            menuContainer.style.display = 'none';
        } else {
            menuContainer.style.display = 'grid';
        }
    });
});
