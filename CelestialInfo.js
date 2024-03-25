
export function updateCelestialInfo(bodies, index) {
    const body = bodies[index];
    const infoDiv = document.getElementById('info-square');

    infoDiv.innerHTML = `
    <h2>${body.name} (${body.latinName})</h2>
   
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
            <h2>${body.name}</h2>
            <p>Latinskt namn:${body.latinName}</p>
            <p>Typ av himlakropp: ${body.type}</p>
            <p>Det tar ${body.name} ${body.rotation} dagar att rotera ett varv runt sin egen axel.</p>
            <p>Avstånd från solen: ${body.distance.toLocaleString()} km</p>
            <p>${body.desc.toLocaleString()}</p>
            <!-- Add more body details here -->
        </div>
    `;

    // Append modal to the body
    document.body.appendChild(modal);

    // Close modal functionality for the close button
    const closeButton = modal.querySelector('.close-button');
    closeButton.onclick = () => {
        closeModal();
    };

    // Close modal if clicked outside of modal content
    modal.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };

    // Function to close and clean up modal
    // function closeModal() {
    //     modal.style.display = 'none'; // Hide modal
    //     modal.remove(); // Remove modal from DOM after hiding
    //     modal.onclick = null; // Remove event listener
    //     closeButton.onclick = null; // Remove close button event listener
    // }
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    });
    
}