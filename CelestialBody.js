// CelestialBody.js
export function createCelestialBody(body, index) {
    const baseDistance = (body.distance) / 150000; // Base distance from the Sun in pixels
    const distanceIncrement = 100; // Increment per planet to keep distances reasonable but distinguishable

    const sizeScale = 10;
    const size = Math.sqrt(body.circumference) / sizeScale;

    const planetDiv = document.createElement('div');
    planetDiv.className = `celestial-body ${body.type.toLowerCase()}`;
    planetDiv.id = `body-${index}`;
    planetDiv.style.width = `${size}px`;
    planetDiv.style.height = `${size}px`;
    planetDiv.style.position = 'absolute';
    planetDiv.style.left = `${baseDistance + index * distanceIncrement}px`; // Horizontal position based on index

    // Apply conditional styling based on the celestial body type
    if (body.type.toLowerCase() === 'planet') {
        planetDiv.style.backgroundColor = '#8888ff'; // Example color for planets
    } else if (body.type.toLowerCase() === 'star') {
        planetDiv.style.backgroundColor = '#ffff00'; // Example color for stars
    }

    document.getElementById('space-view').appendChild(planetDiv);
}

export function updateCelestialInfo(bodies, index) {
    const body = bodies[index];
    const infoDiv = document.getElementById('celestial-info');
    const celestialBodies = document.querySelectorAll('.celestial-body');

    infoDiv.innerHTML = `<h2>${body.name} (${body.latinName})</h2>
                         <p>Type: ${body.type}</p>
                         <p>Rotation Period: ${body.rotation} days</p>
                         <p>Distance from Sun: ${body.distance.toLocaleString()} km</p>`; // Add more details as needed

    celestialBodies.forEach((div, idx) => {
        div.style.opacity = idx === index ? 1 : 0.2;
        if (idx === index) {
            div.style.zIndex = 10; // Bring to front
        } else {
            div.style.zIndex = 1; // Send to back
        }
    });
}
