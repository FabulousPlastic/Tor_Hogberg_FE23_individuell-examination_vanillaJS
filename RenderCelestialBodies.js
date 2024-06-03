// function calculateSizeScale() {
//     const baseSize = 1200; // Base size for scaling
//     const spaceViewWidth = document.getElementById('space-view').clientWidth;
//     return spaceViewWidth / baseSize;
// }

// function calculateDistanceScale() {
//     const baseDistance = 100000000; // Base distance for scaling
//     const spaceViewWidth = document.getElementById('space-view').clientWidth;
//     return spaceViewWidth / baseDistance;
// }

export function createCelestialBody(body, index) {
    const spaceView = document.getElementById('space-view');
    const viewportWidth = window.innerWidth;
    console.log(viewportWidth);
    // Calculate the base distance from the Sun, converting the distance from km to a more manageable pixel value
    const distanceScale = 20000000;
    const baseDistance = (body.distance) / distanceScale * viewportWidth; // Scale the astronomical distance

    // Define a scaling factor for adjusting the size of the celestial body visually
    const sizeScale =  1000;
    const size = Math.sqrt(body.circumference) / sizeScale * viewportWidth; // Scale the size

    // Create a new div element to visually represent the celestial body
    const planetDiv = document.createElement('div');
    planetDiv.className = `celestial-body ${body.type.toLowerCase()} ${body.name.toLowerCase()}`;
    planetDiv.id = `body-${index}`;

    planetDiv.style.width = `${size}px`;
    planetDiv.style.height = `${size}px`;
    planetDiv.style.position = 'absolute';

    // Initially, append the planet to calculate its size and adjust position
    spaceView.appendChild(planetDiv);

    // For the sun (index 0), determine its center for use with other planets
    if (index === 0) {
        // Sun's div must be positioned first to get a reference point for others
        planetDiv.style.left = `${spaceView.clientWidth / 2 - planetDiv.offsetWidth / 2}px`;
    } else {
        const solDiv = document.getElementById('body-0');  // Get the sun's div
        const solRect = solDiv.getBoundingClientRect();
        const solRight = solRect.left + solRect.width - spaceView.getBoundingClientRect().left;

        // Position the celestial body horizontally within the space view container based on its index and calculated distances
        planetDiv.style.left = `${solRight + baseDistance}px`; // Positions based on the center of the sun
    }
}
