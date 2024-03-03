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