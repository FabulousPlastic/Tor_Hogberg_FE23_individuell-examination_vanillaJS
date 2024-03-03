// main.js
import { getApiKey, fetchBodies } from './API.js';
import { createCelestialBody, updateCelestialInfo } from './CelestialBody.js';
import { updateParallax, scrollToPlanet } from './Parallax.js';

let bodies = [];
let currentIndex = 0;

async function main() {
    try {
        const apiKey = await getApiKey();
        bodies = await fetchBodies(apiKey);
        bodies.forEach((body, index) => {
            createCelestialBody(body, index);
        });
        updateCelestialInfo(bodies, 0); // Make sure this is updated to handle new imports
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('next').addEventListener('click', () => {
    if (currentIndex < bodies.length - 1) {
        currentIndex++;
        updateCelestialInfo(bodies, currentIndex);
        scrollToPlanet(currentIndex); // Ensure this is correctly placed to call after updating info
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCelestialInfo(bodies, currentIndex);
        scrollToPlanet(currentIndex); // Ensure this is correctly placed to call after updating info
    }
});

document.getElementById('space-view').addEventListener('scroll', updateParallax);

main();
