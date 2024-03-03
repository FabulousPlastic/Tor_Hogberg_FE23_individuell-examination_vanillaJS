// CelestialBody.js
export function createCelestialBody(body, index) {
    const baseDistance = body.distance / 150000;
    const distanceIncrement = 100;
    const sizeScale = 10;
    const size = Math.sqrt(body.circumference) / sizeScale;

    const planetDiv = document.createElement('div');
    planetDiv.className = `celestial-body ${body.type.toLowerCase()}`;
    planetDiv.id = `body-${index}`;
    planetDiv.style.width = `${size}px`;
    planetDiv.style.height = `${size}px`;
    planetDiv.style.position = 'absolute';
    planetDiv.style.left = `${baseDistance + index * distanceIncrement}px`;

    if (body.type.toLowerCase() === 'planet') {
        planetDiv.style.backgroundColor = '#8888ff';
    } else if (body.type.toLowerCase() === 'star') {
        planetDiv.style.backgroundColor = '#ffff00';
    }
    document.getElementById('space-view').appendChild(planetDiv);
}

export function updateCelestialInfo(bodies, index) {
    const body = bodies[index];
    const infoDiv = document.getElementById('celestial-info');
    const celestialBodies = document.querySelectorAll('.celestial-body');

    infoDiv.innerHTML = `<h2>${body.name} (${body.latinName})</h2>
                         <p>Type: ${body.type}</p>
                         <p>Rotation Period: ${body.rotation} days</p>`;
    celestialBodies.forEach((div, idx) => {
        div.style.opacity = idx === index ? 1 : 0.2;
        div.style.zIndex = idx === index ? 10 : 1;
    });
    scrollToPlanet(index);
}

function scrollToPlanet(index) {
    const spaceView = document.getElementById('space-view');
    const planetDiv = document.getElementById(`body-${index}`);
    const scrollPosition = planetDiv.offsetLeft + planetDiv.offsetWidth / 2 - spaceView.offsetWidth / 2;
    spaceView.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}
