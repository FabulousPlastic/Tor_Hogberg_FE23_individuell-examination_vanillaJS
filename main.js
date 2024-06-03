import { getApiKey, fetchBodies } from './API.js';
import { createCelestialBody } from './RenderCelestialBodies.js';
import { updateParallax, scrollToPlanet } from './ScrollAnimations.js';
import { updateCelestialInfo } from './CelestialInfo.js';
import { performSearch } from './Search.js';
import { updateNavigationButtons } from './NavButtons.js';

let bodies = [];
let currentIndex = 3;
let planetPositions = [];
let isResizing = false;

async function main() {
    try {
        const apiKey = await getApiKey();
        bodies = await fetchBodies(apiKey);
        initializeCelestialBodies();
        updateCelestialInfo(bodies, currentIndex);
        updateNavigationButtons(bodies, currentIndex);
        setupPlanetPositions();
        scrollToTargetPlanet(currentIndex);

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
    const spaceView = document.getElementById('space-view');
    spaceView.innerHTML = '';

    spaceView.innerHTML += `
        <div class="parallax-layer" style="--depth: 0.2;"></div>
        <div class="parallax-layer" style="--depth: 0.5;"></div>
        <div class="parallax-layer" style="--depth: 1;"></div>
    `;

    bodies.forEach((body, index) => createCelestialBody(body, index));
    setupPlanetPositions();
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
        updateCelestialInfo(bodies, currentIndex);
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
    scrollToPlanet(index, targetDistance);
}

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
    const keepCurrentIndex = currentIndex;

    initializeCelestialBodies();

    const currentPlanetCentreAfterResize = planetPositions[keepCurrentIndex].centerPosition;
    const spaceView = document.getElementById('space-view');
    const viewportWidth = window.innerWidth;

    spaceView.scrollLeft = currentPlanetCentreAfterResize - (viewportWidth / 2);
    scrollToTargetPlanet(currentIndex);
    isResizing = false;
};
main();
