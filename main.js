// main.js
import { getApiKey, fetchBodies } from './API.js';
import { createCelestialBody } from './CelestialBody.js';
import { updateParallax, scrollToPlanet } from './Parallax.js';
import { updateCelestialInfo } from './CelestialInfo.js';
import { setupSearch } from './Search.js'; // Import the search module

let bodies = [];
let currentIndex = 0;

async function main() {
    try {
        const apiKey = await getApiKey();
        bodies = await fetchBodies(apiKey);
        bodies.forEach((body, index) => {
            createCelestialBody(body, index);
        });
        updateCelestialInfo(bodies, 0);
        setupSearch(bodies, updateCelestialInfo, scrollToPlanet); // Initialize the search functionality
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('space-view').addEventListener('scroll', updateParallax);



document.getElementById('next').addEventListener('click', () => {
    if (currentIndex < bodies.length - 1) {
        currentIndex++;
        updateCelestialInfo(bodies, currentIndex);
        scrollToPlanet(currentIndex);
        // Update buttons' text based on current index
        document.getElementById('prev').textContent = currentIndex > 0 ? bodies[currentIndex - 1].name : '';
        document.getElementById('next').textContent = currentIndex < bodies.length - 1 ? bodies[currentIndex + 1].name : '';
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCelestialInfo(bodies, currentIndex);
        scrollToPlanet(currentIndex);
        // Update buttons' text based on current index
        document.getElementById('prev').textContent = currentIndex > 0 ? bodies[currentIndex - 1].name : '';
        document.getElementById('next').textContent = currentIndex < bodies.length - 1 ? bodies[currentIndex + 1].name : '';
    }
});

// Set initial button texts when the page loads
if (bodies.length > 0) { // Make sure bodies array is not empty
    document.getElementById('prev').textContent = ''; // No previous planet at the start
    document.getElementById('next').textContent = bodies.length > 1 ? bodies[1].name : ''; // Name of the second planet if available
}


document.getElementById('space-view').addEventListener('scroll', updateParallax);

main();
