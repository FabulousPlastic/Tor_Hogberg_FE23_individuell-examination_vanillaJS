export function createCelestialBody(body, index) {
    const spaceView = document.getElementById('space-view');
    const baseDistance = (body.distance) / 100000; // Base distance from the Sun in pixels
    const distanceIncrement = spaceView.clientWidth + 1000; // Use the container's width

    const sizeScale = 8;
    const size = Math.sqrt(body.circumference) / sizeScale;

    const planetDiv = document.createElement('div');
    planetDiv.className = `celestial-body ${body.type.toLowerCase()} ${body.name.toLowerCase()}`;
    planetDiv.id = `body-${index}`;
    planetDiv.style.width = `${size}dvw`;
    planetDiv.style.maxWidth = `${70 + (size/10)}dvw`;
    planetDiv.style.maxHeight = `${70 + (size/10)}dvw`;
    planetDiv.style.height = `${size}dvw`;
    planetDiv.style.position = 'absolute';
    planetDiv.style.left = `${baseDistance + (distanceIncrement * index * 4)}px`; // Horizontal position based on index

    document.getElementById('space-view').appendChild(planetDiv);
}