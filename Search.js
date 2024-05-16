export function performSearch(bodies) {
    const searchInput = document.getElementById('planet-search');
    const searchError = document.getElementById('search-error');
    searchInput.setAttribute('autocomplete', 'off');
    const searchText = searchInput.value.toLowerCase();
    
    // Check for "home" or "hem" easter egg
    if (searchText === 'home' || searchText === 'hem') {
        searchError.style.display = 'none'; // Hide error message
        document.dispatchEvent(new CustomEvent('searchSuccess', { detail: 3 })); // Directly use index 3 for Earth
        searchInput.value = '';
        return; // Exit the function early
    }

    // Regular search processing
    const matchingIndices = bodies.map((body, index) => 
        body.name.toLowerCase().includes(searchText) || 
        body.latinName.toLowerCase().includes(searchText) ? index : -1
    ).filter(index => index !== -1);

    if (matchingIndices.length === 1) {
        const currentIndex = matchingIndices[0];
        searchError.style.display = 'none'; // Hide error message
        document.dispatchEvent(new CustomEvent('searchSuccess', { detail: currentIndex }));
    } else {
        searchError.style.display = 'block'; // Show error message
    }
    searchInput.value = '';
}

// // search.js
// export function performSearch(bodies) {
//     const searchInput = document.getElementById('planet-search');
//     const searchError = document.getElementById('search-error');
//     searchInput.setAttribute('autocomplete', 'off');
//     const searchText = searchInput.value.toLowerCase();
//     const matchingIndices = bodies.map((body, index) => 
//         body.name.toLowerCase().includes(searchText) || 
//         body.latinName.toLowerCase().includes(searchText) ? index : -1
//     ).filter(index => index !== -1);

//     if (matchingIndices.length === 1) {
//         const currentIndex = matchingIndices[0];
//         searchError.style.display = 'none'; // Hide error message
//         document.dispatchEvent(new CustomEvent('searchSuccess', { detail: currentIndex }));
//     } else {
//         searchError.style.display = 'block'; // Show error message
//     }
//     searchInput.value = '';
// }
