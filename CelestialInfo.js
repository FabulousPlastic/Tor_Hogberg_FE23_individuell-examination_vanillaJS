
export function updateCelestialInfo(bodies, index) {
    const body = bodies[index];
    const infoDiv = document.getElementById('celestial-info');
    
    // Update the innerHTML to include all necessary details
    infoDiv.innerHTML = `
        <h2>${body.name} (${body.latinName})</h2>
        <p>${body.desc.toLocaleString()}</p>
        <p>För mer fakta: <span class="more-info">Klicka här!</span></p>
    `;

    // Make the entire celestial info clickable for more details
    infoDiv.querySelector('.more-info').addEventListener('click', () => {
        // Display all available information from the API
        alert(JSON.stringify(body, null, 2)); // This could be replaced with a more sophisticated display
    });

    // Update the opacity and z-index to highlight the selected celestial body
    const celestialBodies = document.querySelectorAll('.celestial-body');
    celestialBodies.forEach((div, idx) => {
        div.style.opacity = idx === index ? 1 : 0.2;
        div.style.zIndex = idx === index ? 10 : 1; // Bring the selected body to front
    });
}
