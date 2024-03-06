
export function updateCelestialInfo(bodies, index) {
    const body = bodies[index];
    const infoDiv = document.getElementById('info-square');

    infoDiv.innerHTML = `
    <h2>${body.name} (${body.latinName})</h2>
    <p>${body.desc.toLocaleString()}</p>
    <p>För mer fakta: <span class="more-info">Klicka här!</span></p>
`;

    document.querySelector('.more-info').addEventListener('click', () => displayModal(body));
}

function displayModal(body) {
    // Create modal container
    const modal = document.createElement('div');
    modal.id = 'celestial-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>${body.name} Details</h2>
            <p>Name (Swedish): ${body.name}</p>
            <p>Name (Latin): ${body.latinName}</p>
            <p>Type: ${body.type}</p>
            <p>Rotation Period: ${body.rotation} days</p>
            <p>Distance from Sun: ${body.distance.toLocaleString()} km</p>
            <!-- Add more body details here -->
        </div>
    `;

    // Append modal to the body
    document.body.appendChild(modal);

    // Style the modal (you can also move this to your CSS file)
    modal.style.position = 'fixed';
    modal.style.left = '50%';
    modal.style.top = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.zIndex = '100';
    modal.style.padding = '20px';
    modal.style.borderRadius = '10px';
    modal.style.width = '50%';
    modal.style.maxWidth = '600px';
    modal.style.color = '#FFF';
    modal.style.boxSizing = 'border-box';

   
    // Close modal functionality for the close button
    const closeButton = modal.querySelector('.close-button');
    closeButton.onclick = () => {
        modal.style.display = 'none'; // Hide modal
        modal.remove(); // Remove modal from DOM after hiding
    };

    // Close modal if clicked outside of modal content
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none'; // Hide modal
            modal.remove(); // Remove modal from DOM after hiding
        }
    };
}
