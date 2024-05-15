import { getApiKey, fetchBodies } from './API.js';
import { createCelestialBody } from './CelestialBody.js';
import { updateParallax, scrollToPlanet } from './Parallax.js';
import { updateCelestialInfo } from './CelestialInfo.js';  // Ensuring this is imported correctly as a separate module
import { performSearch } from './Search.js';
import { updateNavigationButtons } from './NavButtons.js';

let bodies = [];
let currentIndex = 0;
let planetPositions = [];

async function main() {
    try {
        const apiKey = await getApiKey();
        bodies = await fetchBodies(apiKey);
        bodies.forEach((body, index) => createCelestialBody(body, index));
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

    } catch (error) {
        console.error('Error:', error);
    }
}

function setupPlanetPositions() {
    planetPositions = bodies.map((body, index) => {
        const planetDiv = document.getElementById(`body-${index}`);
        const centerPosition = planetDiv.offsetLeft + planetDiv.offsetWidth / 2;
        return { index, centerPosition, distance: body.distance };
    });
}

function handleScroll() {
    const spaceView = document.getElementById('space-view');
    const centerOfViewport = spaceView.scrollLeft + spaceView.clientWidth / 2;
    const closestPlanet = findClosestPlanet(centerOfViewport);

    if (currentIndex !== closestPlanet.index) {
        currentIndex = closestPlanet.index;
        updateCelestialInfo(bodies, currentIndex);  // Update info panel as user scrolls to different planets
        updateNavigationButtons(bodies, currentIndex);
    }
    updateParallax();
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

main();
