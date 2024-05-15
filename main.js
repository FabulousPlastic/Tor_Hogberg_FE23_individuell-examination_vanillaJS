
// // Importing necessary modules
// import { getApiKey, fetchBodies } from './API.js';
// import { createCelestialBody } from './CelestialBody.js';
// import { updateParallax, scrollToPlanet } from './Parallax.js';
// import { updateCelestialInfo } from './CelestialInfo.js';
// import { performSearch } from './Search.js';
// import { setupDistanceCounter } from './DistanceCounter.js';
// import { updateNavigationButtons } from './NavButtons.js';

// // Global variables to store celestial bodies and the current index
// let bodies = [];
// let currentIndex = 0;
// let distanceCounterModule;

// async function main() {
//     try {
//         // Fetching API key and celestial bodies data
//         const apiKey = await getApiKey();
//         bodies = await fetchBodies(apiKey);

//         // Creating celestial body elements
//         bodies.forEach((body, index) => createCelestialBody(body, index));

//         // Updating UI components with initial data
//         updateCelestialInfo(bodies, currentIndex);
//         updateNavigationButtons(bodies, currentIndex);
//         distanceCounterModule = setupDistanceCounter('distance-to-sun');

//         // Initializing the distance counter with the first celestial body's distance
//         if (bodies.length > 0) {
//             distanceCounterModule.animateDistance(bodies[0].distance);
//         }

        

//         // Event listener for scrolling in the space view
//         // Updates UI components based on the current index
//         document.getElementById('space-view').addEventListener('scroll', () => {
//             updateCelestialInfo(bodies, currentIndex);
//             distanceCounterModule.animateDistance(bodies[currentIndex].distance);
//             updateParallax();
//         });

//     } catch (error) {
//         console.error('Error:', error);  // Error handling
//     }
// }
// //Function to handle switch of planet
// async function switchPlanet(currentIndex) {
//     try {scrollToPlanet(currentIndex);
//         setupDistanceCounter(currentIndex);
//         updateNavigationButtons(bodies, currentIndex);
//         updateCelestialInfo(bodies, currentIndex);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }


// // Adding an event listener for the search button click event
//         // This triggers the performSearch function with the current bodies array
//         document.getElementById('search-button').addEventListener('click', () => {
//             performSearch(bodies);
//         });

//         // Adding an event listener for the Enter keypress event on the search input
//         // This also triggers the performSearch function
//         document.getElementById('planet-search').addEventListener('keypress', (event) => {
//             if (event.key === 'Enter') {
//                 performSearch(bodies);
//                 event.preventDefault(); // Prevent the default form submission behavior
//             }
//         });
// // Event listener for handling the searchSuccess custom event
// // Updates various UI components based on the new current index from the search
// document.addEventListener('searchSuccess', (event) => {
//     currentIndex = event.detail;  // Updating currentIndex with the detail from the custom event
//     switchPlanet(currentIndex);
// });

// document.getElementById('prev').addEventListener('click', () => {
//     currentIndex = (currentIndex - 1);
//     switchPlanet (currentIndex);
// })

// document.getElementById('next').addEventListener('click', () => {
//     currentIndex = (currentIndex + 1);
//     switchPlanet (currentIndex);
// })

// main();  // Calling main to initialize the application
// // Importing necessary modules
// import { getApiKey, fetchBodies } from './API.js';
// import { createCelestialBody } from './CelestialBody.js';
// import { updateParallax, scrollToPlanet } from './Parallax.js';
// import { updateCelestialInfo } from './CelestialInfo.js';
// import { performSearch } from './Search.js';
// import { setupDistanceCounter } from './DistanceCounter.js';
// import { updateNavigationButtons } from './NavButtons.js';

// let bodies = [];
// let currentIndex = 0;
// let distanceCounterModule;

// async function main() {
//     try {
//         const apiKey = await getApiKey();
//         bodies = await fetchBodies(apiKey);

//         bodies.forEach((body, index) => createCelestialBody(body, index));

//         updateCelestialInfo(bodies, currentIndex);
//         updateNavigationButtons(bodies, currentIndex);
//         distanceCounterModule = setupDistanceCounter('distance-to-sun');

//         if (bodies.length > 0) {
//             distanceCounterModule.animateDistance(bodies[0].distance);
//         }

//         document.getElementById('space-view').addEventListener('scroll', () => {
//             const spaceView = document.getElementById('space-view');
//             const maxScroll = spaceView.scrollWidth - spaceView.clientWidth;
//             const scrollPercentage = spaceView.scrollLeft / maxScroll;
//             const startDistance = bodies[0].distance;
//             const endDistance = bodies[bodies.length - 1].distance;
//             const currentDistance = startDistance + (endDistance - startDistance) * scrollPercentage;
//             distanceCounterModule.animateDistance(Math.round(currentDistance));
//             updateParallax();
//         });

//         document.getElementById('search-button').addEventListener('click', () => {
//             performSearch(bodies);
//         });

//         document.getElementById('planet-search').addEventListener('keypress', (event) => {
//             if (event.key === 'Enter') {
//                 performSearch(bodies);
//                 event.preventDefault();
//             }
//         });

//         document.addEventListener('searchSuccess', (event) => {
//             currentIndex = event.detail;
//             switchPlanet(currentIndex);
//         });

//         document.getElementById('prev').addEventListener('click', () => {
//             currentIndex = Math.max(0, currentIndex - 1);
//             switchPlanet(currentIndex);
//         });

//         document.getElementById('next').addEventListener('click', () => {
//             currentIndex = Math.min(bodies.length - 1, currentIndex + 1);
//             switchPlanet(currentIndex);
//         });

//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// async function switchPlanet(index) {
//     scrollToPlanet(index);
//     distanceCounterModule.animateDistance(bodies[index].distance);
//     updateNavigationButtons(bodies, index);
//     updateCelestialInfo(bodies, index);
// }

// main();
// import { getApiKey, fetchBodies } from './API.js';
// import { createCelestialBody } from './CelestialBody.js';
// import { updateParallax, scrollToPlanet } from './Parallax.js';
// import { updateCelestialInfo } from './CelestialInfo.js';
// import { performSearch } from './Search.js';
// import { setupDistanceCounter } from './DistanceCounter.js';
// import { updateNavigationButtons } from './NavButtons.js';

// let bodies = [];
// let currentIndex = 0;
// let distanceCounterModule;
// let planetPositions = [];

// async function main() {
//     try {
//         const apiKey = await getApiKey();
//         bodies = await fetchBodies(apiKey);
//         bodies.forEach((body, index) => createCelestialBody(body, index));
//         updateCelestialInfo(bodies, currentIndex);
//         updateNavigationButtons(bodies, currentIndex);
//         distanceCounterModule = setupDistanceCounter('distance-to-sun');

//         setupPlanetPositions(); // This needs to be called after planets are created and rendered.

//         document.getElementById('space-view').addEventListener('scroll', handleScroll);
//         document.getElementById('search-button').addEventListener('click', () => performSearch(bodies));
//         document.getElementById('planet-search').addEventListener('keypress', (event) => {
//             if (event.key === 'Enter') {
//                 performSearch(bodies);
//                 event.preventDefault();
//             }
//         });
//         document.addEventListener('searchSuccess', (event) => {
//             currentIndex = event.detail;
//             switchPlanet(currentIndex);
//         });
//         document.getElementById('prev').addEventListener('click', () => {
//             currentIndex = Math.max(0, currentIndex - 1);
//             switchPlanet(currentIndex);
//         });
//         document.getElementById('next').addEventListener('click', () => {
//             currentIndex = Math.min(bodies.length - 1, currentIndex + 1);
//             switchPlanet(currentIndex);
//         });

//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// function setupPlanetPositions() {
//     planetPositions = bodies.map((body, index) => {
//         const planetDiv = document.getElementById(`body-${index}`);
//         const centerPosition = planetDiv.offsetLeft + planetDiv.offsetWidth / 2;
//         return { index, centerPosition, distance: body.distance };
//     });
// }

// function handleScroll() {
//     const spaceView = document.getElementById('space-view');
//     const centerOfViewport = spaceView.scrollLeft + spaceView.clientWidth / 2;
//     const closestPlanet = findClosestPlanet(centerOfViewport);

//     if (currentIndex !== closestPlanet.index) {
//         currentIndex = closestPlanet.index;
//         distanceCounterModule.animateDistance(closestPlanet.distance);
//         updateCelestialInfo(bodies, currentIndex);
//         updateNavigationButtons(bodies, currentIndex);
//     }
//     updateParallax();
// }

// function findClosestPlanet(centerOfViewport) {
//     return planetPositions.reduce((closest, planet) => {
//         return (Math.abs(planet.centerPosition - centerOfViewport) < Math.abs(closest.centerPosition - centerOfViewport)) ? planet : closest;
//     });
// }

// function switchPlanet(index) {
//     scrollToPlanet(index);
//     distanceCounterModule.animateDistance(bodies[index].distance);
//     updateNavigationButtons(bodies, index);
//     updateCelestialInfo(bodies, index);
// }

// main();
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
