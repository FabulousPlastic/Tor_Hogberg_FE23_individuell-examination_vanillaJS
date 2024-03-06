export function createCelestialBody(body, index) {
    const baseDistance = (body.distance) / 100000; // Base distance from the Sun in pixels
    const distanceIncrement = 150; // Increment per planet to keep distances reasonable but distinguishable

    const sizeScale = 2;
    const size = Math.sqrt(body.circumference) / sizeScale;

    const planetDiv = document.createElement('div');
    // Assign a general 'planet' class along with a specific class based on the planet's name
    planetDiv.className = `celestial-body ${body.type.toLowerCase()} ${body.name.toLowerCase()}`;
    planetDiv.id = `body-${index}`;
    planetDiv.style.width = `${size}px`;
    planetDiv.style.height = `${size}px`;
    planetDiv.style.position = 'absolute';
    planetDiv.style.left = `${baseDistance + distanceIncrement * (index *8)}px`; // Horizontal position based on index

    document.getElementById('space-view').appendChild(planetDiv);
}
