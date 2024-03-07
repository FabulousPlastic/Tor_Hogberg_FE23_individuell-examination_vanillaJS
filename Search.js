// Search.js
export function setupSearch(bodies, updateCelestialInfo, scrollToPlanet) {
    const searchInput = document.getElementById('planet-search');
    const searchButton = document.getElementById('search-button');
    const searchError = document.getElementById('search-error');

    const performSearch = () => {
        const searchText = searchInput.value.toLowerCase();
        const matchingIndices = bodies.map((body, index) => 
            body.name.toLowerCase().includes(searchText) || 
            body.latinName.toLowerCase().includes(searchText) ? index : -1
        ).filter(index => index !== -1);

        if (matchingIndices.length === 1) {
            const currentIndex = matchingIndices[0];
            updateCelestialInfo(bodies, currentIndex);
            scrollToPlanet(currentIndex);
            searchError.style.display = 'none'; // Hide error message
        } else {
            searchError.style.display = 'block'; // Show error message
        }
        
        searchInput.value = ''; // Reset the search field
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}
