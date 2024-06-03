import { getApiKey, fetchBodies } from './API.js';
import { createCelestialBody } from './RenderCelestialBodies.js';
import { updateParallax, scrollToPlanet } from './ScrollAnimations.js';
import { updateCelestialInfo } from './CelestialInfo.js';  // Ensuring this is imported correctly as a separate module
import { performSearch } from './Search.js';
import { updateNavigationButtons } from './NavButtons.js';

let bodies = [];
let currentIndex = 0;
let planetPositions = [];
let isResizing = false;
async function main() {
    try {
        const apiKey = await getApiKey();
        bodies = await fetchBodies(apiKey);
        initializeCelestialBodies();
        updateCelestialInfo(bodies, currentIndex);  // Call updateCelestialInfo after bodies are fetched
        updateNavigationButtons(bodies, currentIndex);

        setupPlanetPositions();  // This needs to be called after planets are created and rendered.

        document.getElementById('space-view').addEventListener('scroll', handleScroll);
        document.getElementById('search-button').addEventListener('click', () => performSearch(bodies));
        document.getElementById('planet-search').addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                performSearch(bodies);
                event.preventDefault();
            }
        });
        document.addEventListener('searchSuccess', (event) => {
            currentIndex = event.detail;
            scrollToTargetPlanet(currentIndex);
        });
        document.getElementById('prev').addEventListener('click', () => {
            currentIndex = Math.max(0, currentIndex - 1);
            scrollToTargetPlanet(currentIndex);
        });
        document.getElementById('next').addEventListener('click', () => {
            currentIndex = Math.min(bodies.length - 1, currentIndex + 1);
            scrollToTargetPlanet(currentIndex);
        });

        window.addEventListener('resize', () => {
            debounce(handleResize, 1000)();
        });
        

    } catch (error) {
        console.error('Error:', error);
    }
}

function initializeCelestialBodies() {
    if (isResizing) {
        return;
    }
    const spaceView = document.getElementById('space-view');
    spaceView.innerHTML = ''; // Clear existing celestial bodies and parallax layers

    // Add parallax layers back
    spaceView.innerHTML += `
        <div class="parallax-layer" style="--depth: 0.2;"></div>
        <div class="parallax-layer" style="--depth: 0.5;"></div>
        <div class="parallax-layer" style="--depth: 1;"></div>
    `;

    bodies.forEach((body, index) => createCelestialBody(body, index));
    setupPlanetPositions();  // Update planet positions after re-rendering
}

function setupPlanetPositions() {
    planetPositions = bodies.map((body, index) => {
        const planetDiv = document.getElementById(`body-${index}`);
        const centerPosition = planetDiv.offsetLeft + planetDiv.offsetWidth / 2;
        return { index, centerPosition, distance: body.distance };
    });
}

function handleScroll() {
    if (isResizing) {
        return;
    }
    const spaceView = document.getElementById('space-view');
    const centerOfViewport = spaceView.scrollLeft + spaceView.clientWidth / 2;
    const closestPlanet = findClosestPlanet(centerOfViewport);

    if (currentIndex !== closestPlanet.index) {
        currentIndex = closestPlanet.index;
        updateCelestialInfo(bodies, currentIndex);  // Update info panel as user scrolls to different planets
        updateNavigationButtons(bodies, currentIndex);
    }
    updateParallax();  // Ensure parallax effect is updated on scroll
}

function findClosestPlanet(centerOfViewport) {
    return planetPositions.reduce((closest, planet) => {
        return (Math.abs(planet.centerPosition - centerOfViewport) < Math.abs(closest.centerPosition - centerOfViewport)) ? planet : closest;
    });
}

function scrollToTargetPlanet(index) {
    const targetDistance = bodies[index].distance;
    scrollToPlanet(index, targetDistance);  // This call should now handle both scrolling and distance display.
}


// Debounce function
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const args = arguments;
        const context = this;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
}

function handleResize() {
    if (!isResizing) {
        isResizing = true;
    }
    // Get the current planet's position
    const keepCurrentIndex = currentIndex;

    initializeCelestialBodies();

    const currentPlanetCentreAfterResize = planetPositions[keepCurrentIndex].centerPosition;

    const spaceView = document.getElementById('space-view');
    const viewportWidth = window.innerWidth;

    spaceView.scrollLeft = currentPlanetCentreAfterResize - (viewportWidth / 2);
    
    // Ensure the current planet is scrolled into view
    scrollToTargetPlanet(currentIndex);
    isResizing = false;
};
main();
