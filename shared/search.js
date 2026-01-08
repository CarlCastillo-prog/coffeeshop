document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchBar = document.querySelector('.search-bar');
    let searchResultsDiv = null;

    function createSearchResultsDiv() {
        if (!searchResultsDiv) {
            searchResultsDiv = document.createElement('div');
            searchResultsDiv.id = 'search-results';
            searchResultsDiv.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #ccc;
                border-top: none;
                max-height: 300px;
                overflow-y: auto;
                z-index: 1000;
                display: none;
            `;
            searchBar.style.position = 'relative';
            searchBar.appendChild(searchResultsDiv);
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (!searchResultsDiv) createSearchResultsDiv();

        if (searchTerm === '') {
            searchResultsDiv.style.display = 'none';
            return;
        }

        const matchingItems = menuItems.filter(item =>
            item.name.toLowerCase().startsWith(searchTerm)
        );

        if (matchingItems.length === 0) {
            searchResultsDiv.innerHTML = '<div style="padding: 10px; color: #666;">No items found</div>';
            searchResultsDiv.style.display = 'block';
            return;
        }

        searchResultsDiv.innerHTML = matchingItems.map(item => `
            <div class="search-result-item" style="padding: 10px; border-bottom: 1px solid #eee; cursor: pointer; display: flex; justify-content: space-between;" data-name="${item.name}">
                <span>${item.name}</span>
                <span style="font-weight: bold;">${item.price}</span>
            </div>
        `).join('');

        searchResultsDiv.style.display = 'block';

        // Add click event listeners
        searchResultsDiv.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                const itemName = this.getAttribute('data-name');
                window.location.href = '../thirdPage/menu.html?search=' + encodeURIComponent(itemName);
            });
        });
    }

    searchInput.addEventListener('input', performSearch);

    // Hide results when clicking outside
    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target) && searchResultsDiv) {
            searchResultsDiv.style.display = 'none';
        }
    });
});
