
// Importing necessary modules
import { getApiKey, fetchBodies } from './API.js';
import { createCelestialBody } from './CelestialBody.js';
import { updateParallax, scrollToPlanet } from './Parallax.js';
import { updateCelestialInfo } from './CelestialInfo.js';
import { performSearch } from './Search.js';
import { setupDistanceCounter } from './DistanceCounter.js';
import { updateNavigationButtons } from './NavButtons.js';

// Global variables to store celestial bodies and the current index
let bodies = [];
let currentIndex = 0;
let distanceCounterModule;

async function main() {
    try {
        // Fetching API key and celestial bodies data
        const apiKey = await getApiKey();
        bodies = await fetchBodies(apiKey);

        // Creating celestial body elements
        bodies.forEach((body, index) => createCelestialBody(body, index));

        // Updating UI components with initial data
        updateCelestialInfo(bodies, currentIndex);
        updateNavigationButtons(bodies, currentIndex);
        distanceCounterModule = setupDistanceCounter('distance-to-sun');

        // Initializing the distance counter with the first celestial body's distance
        if (bodies.length > 0) {
            distanceCounterModule.animateDistance(bodies[0].distance);
        }

        

        // Event listener for scrolling in the space view
        // Updates UI components based on the current index
        document.getElementById('space-view').addEventListener('scroll', () => {
            updateCelestialInfo(bodies, currentIndex);
            distanceCounterModule.animateDistance(bodies[currentIndex].distance);
            updateParallax();
        });

    } catch (error) {
        console.error('Error:', error);  // Error handling
    }
}
//Function to handle switch of planet
async function switchPlanet(currentIndex) {
    try {scrollToPlanet(currentIndex);
        await distanceCounterModule.animateDistance(bodies[currentIndex].distance);
        updateNavigationButtons(bodies, currentIndex);
        updateCelestialInfo(bodies, currentIndex);
    } catch (error) {
        console.error('Error:', error);
    }
}


// Adding an event listener for the search button click event
        // This triggers the performSearch function with the current bodies array
        document.getElementById('search-button').addEventListener('click', () => {
            performSearch(bodies);
        });

        // Adding an event listener for the Enter keypress event on the search input
        // This also triggers the performSearch function
        document.getElementById('planet-search').addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                performSearch(bodies);
                event.preventDefault(); // Prevent the default form submission behavior
            }
        });
// Event listener for handling the searchSuccess custom event
// Updates various UI components based on the new current index from the search
document.addEventListener('searchSuccess', (event) => {
    currentIndex = event.detail;  // Updating currentIndex with the detail from the custom event
    switchPlanet(currentIndex);
});

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1);
    switchPlanet (currentIndex);
})

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1);
    switchPlanet (currentIndex);
})

main();  // Calling main to initialize the application
