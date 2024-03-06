// Search.js
export function setupPlanetSearch(bodies, updateDisplayFunction) {
    const searchInput = document.getElementById('planet-search');

    searchInput.addEventListener('input', (event) => {
        const searchText = event.target.value.toLowerCase();

        // Find the first planet that matches the search text
        const foundIndex = bodies.findIndex(body => body.name.toLowerCase().includes(searchText));

        if (foundIndex >= 0) {
            updateDisplayFunction(bodies, foundIndex);
        }
    });
}
