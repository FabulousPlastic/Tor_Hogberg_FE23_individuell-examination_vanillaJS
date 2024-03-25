export function createCelestialBody(body, index) {
    const spaceView = document.getElementById('space-view');
    const baseDistance = (body.distance) / 100000; // Base distance from the Sun in pixels
    const distanceIncrement = spaceView.clientWidth + 1000; // Use the container's width

    const sizeScale = 0.6;
    const size = Math.sqrt(body.circumference) / sizeScale;

    const planetDiv = document.createElement('div');
    planetDiv.className = `celestial-body ${body.type.toLowerCase()} ${body.name.toLowerCase()}`;
    planetDiv.id = `body-${index}`;
    planetDiv.style.width = `${size}px`;
    planetDiv.style.height = `${size}px`;
    planetDiv.style.position = 'absolute';
    planetDiv.style.left = `${baseDistance + (distanceIncrement * index * 4)}px`; // Horizontal position based on index

    document.getElementById('space-view').appendChild(planetDiv);
}