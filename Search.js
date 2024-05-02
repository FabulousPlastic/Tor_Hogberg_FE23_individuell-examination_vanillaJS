// search.js
import { updateCelestialInfo } from './CelestialInfo.js';
export function setupSearch(bodies, updateCelestialInfo, scrollToPlanet, animateDistance) {
    const searchInput = document.getElementById('planet-search');
    const searchError = document.getElementById('search-error');


    const performSearch = () => {
        const searchText = searchInput.value.toLowerCase();
        
        const matchingIndices = bodies.map((body, index) => 
            body.name.toLowerCase().includes(searchText) || 
            body.latinName.toLowerCase().includes(searchText) ? index : -1
        ).filter(index => index !== -1);

        if (matchingIndices.length === 1) {
            const currentIndex = matchingIndices[0];
            // searchError.style.display = 'none'; // Hide error message
            return
        } 
        else {
            searchError.style.display = 'block'; // Show error message
        }
        searchInput.value = ''; 
        return
    };    


}