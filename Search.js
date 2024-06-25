export function performSearch(bodies) {
    const searchInput = document.getElementById('search-input-field');
    const searchError = document.getElementById('search-error');
    searchInput.setAttribute('autocomplete', 'off');
    const searchText = searchInput.value.toLowerCase();
    
    // Extra search processing for 'home' and 'hem'
    if (searchText === 'home' || searchText === 'hem') {
        searchError.style.display = 'none'; // Hide error message
        document.dispatchEvent(new CustomEvent('searchSuccess', { detail: 3 })); // Directly use index 3 for Earth
        searchInput.value = '';
        return;
    }
sqw
    // Regular search processing
    const matchingIndices = bodies.map((body, index) => 
        body.name.toLowerCase().includes(searchText) || 
        body.latinName.toLowerCase().includes(searchText) ? index : -1
    ).filter(index => index !== -1);

    if (matchingIndices.length === 1) {
        const currentIndex = matchingIndices[0];
        searchError.style.display = 'none';
        document.dispatchEvent(new CustomEvent('searchSuccess', { detail: currentIndex }));
    } else {
        searchError.innerHTML = `Det är för farligt att åka till ${searchText}... <br> (eller så hittar jag bara inte dit!)`;
        searchError.style.display = 'block';
        setTimeout(() => {
            searchError.style.display = 'none';
        }, 3000);
    }
    searchInput.value = '';
}