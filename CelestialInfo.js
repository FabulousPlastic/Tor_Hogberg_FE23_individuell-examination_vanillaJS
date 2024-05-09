// Function to update the displayed information about celestial bodies.
export function updateCelestialInfo(bodies, currentIndex) {
    // Retrieve the celestial body at the current index.
    const body = bodies[currentIndex];
    // Access the HTML element where celestial body information will be displayed.
    const infoDiv = document.getElementById('info-square');

    // Set the inner HTML of the infoDiv element with the current body's information.
    infoDiv.innerHTML = `
    <h2>${body.name}</h2>
    <p>För mer fakta: <span class="more-info">Klicka här!</span></p>
    `;

    // Add an event listener to the clickable 'more-info' span that triggers a modal display.
    document.querySelector('.more-info').addEventListener('click', () => displayModal(body));
}

// Function to display a modal with detailed information about the celestial body.
function displayModal(body) {
    // Create a new div element to act as the modal container.
    const modal = document.createElement('div');
    modal.id = 'celestial-modal';
    modal.className = 'modal';

    // Set the inner HTML of the modal with extensive details about the celestial body.
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>${body.name}</h2>
            <p>Latinskt namn: ${body.latinName}</p>
            <p>Typ av himlakropp: ${body.type}</p>
            <p>Det tar ${body.name} ${body.rotation} dagar att rotera ett varv runt sin egen axel.</p>
            <p>${body.desc.toLocaleString()}</p>
        </div>
    `;

    // Append the modal to the main document body for display.
    document.body.appendChild(modal);

    // Access the close button within the modal for future use.
    const closeButton = modal.querySelector('.close-button');
    // Add an onclick event handler to the close button to trigger the closing of the modal.
    closeButton.onclick = () => {
        closeModal();
    };

    // Add a click event on the modal to close it if the click is outside the modal content.
    modal.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };

    // Define a function to close the modal and clean up.
    function closeModal() {
        modal.style.display = 'none'; // Hide the modal
        modal.remove(); // Remove the modal from the DOM entirely
        modal.onclick = null; // Clear any onclick event attached to the modal
        closeButton.onclick = null; // Clear the onclick event from the close button
    }

    // Add a global click event listener that triggers modal closure if clicked outside its content.
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    });
}
