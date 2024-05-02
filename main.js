// main.js
import { getApiKey, fetchBodies } from './API.js';
import { createCelestialBody } from './CelestialBody.js';
import { updateParallax, scrollToPlanet } from './Parallax.js';
import { updateCelestialInfo } from './CelestialInfo.js';
import { setupSearch } from './Search.js';
import { setupDistanceCounter } from './DistanceCounter.js';
import { updateNavigationButtons } from './NavButtons.js';

let bodies = [];
let currentIndex = 0;
let distanceCounterModule; // Declare distanceCounterModule outside of main
async function main() {
    try {
        const apiKey = await getApiKey();
        bodies = await fetchBodies(apiKey);
        bodies.forEach((body, index) => {
            createCelestialBody(body, index);
        });

        updateCelestialInfo(bodies, currentIndex);
        updateNavigationButtons(bodies, currentIndex);

        distanceCounterModule = setupDistanceCounter('distance-to-sun'); // Initialize distanceCounterModule
        setupSearch(bodies, updateCelestialInfo, scrollToPlanet, distanceCounterModule.animateDistance);

        setupSearch(bodies, currentIndex, updateCelestialInfo, scrollToPlanet); // Pass updateNavigationButtons as a callback
        // Assuming an initial update for the distance counter
        if (bodies.length > 0) {
            distanceCounterModule.animateDistance(bodies[0].distance);
        }

        document.getElementById('space-view').addEventListener('scroll', () => {
            // Implementation to update currentIndex based on scroll
            // This example uses a placeholder approach
            updateCelestialInfo(bodies, currentIndex);
            distanceCounterModule.animateDistance(bodies[currentIndex].distance);
            updateParallax();
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// // Update navigation buttons
// function updateNavigationButtons(currentBodyName) {
//     const prevButton = document.getElementById('prev');
//     const nextButton = document.getElementById('next');
//     const prevIndex = currentIndex - 1;
//     const nextIndex = currentIndex + 1;
//     prevButton.textContent = prevIndex >= 0 ? bodies[prevIndex].name : '';
//     nextButton.textContent = nextIndex < bodies.length ? bodies[nextIndex].name : '';
// }

// document.getElementById('next').addEventListener('click', () => {
//     if (currentIndex < bodies.length - 1) {
//         currentIndex++;
//         updateCelestialInfo(bodies, currentIndex);
//         scrollToPlanet(currentIndex);
//         updateNavigationButtons(bodies[currentIndex].name);
//         distanceCounterModule.animateDistance(bodies[currentIndex].distance);
//     }
// });

// document.getElementById('prev').addEventListener('click', () => {
//     if (currentIndex > 0) {
//         currentIndex--;
//         updateCelestialInfo(bodies, currentIndex);
//         scrollToPlanet(currentIndex);
//         updateNavigationButtons(bodies[currentIndex].name);
//         distanceCounterModule.animateDistance(bodies[currentIndex].distance);
//     }
// });

// document.getElementById('search-button').addEventListener('click', () => {
//     performSearch(currentIndex);
// });

// document.getElementById('planet-search').addEventListener('keypress', event => {
//     if (event.key === 'Enter') {
//         performSearch(currentIndex);
//     }
// });
document.getElementById('search-button').addEventListener('click', setupSearch);
document.getElementById('planet-search').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            setupSearch();
        }
    });
main();