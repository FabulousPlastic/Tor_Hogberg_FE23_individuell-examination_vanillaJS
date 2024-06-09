// Updates name/information about the currently displayed celestial body.
export function updateCelestialInfo(bodies, currentIndex) {
    const body = bodies[currentIndex];
    const infoDiv = document.getElementById('info-square');

    infoDiv.innerHTML = `
    <h2>${body.name}</h2>
    <p>För mer fakta: <span class="more-info">Klicka här!</span></p>
    `;

    document.querySelector('.more-info').addEventListener('click', () => displayModal(body));
}

// Displays a modal with additional information about the celestial body.
function displayModal(body) {
    const modal = document.createElement('div');
    modal.id = 'celestial-modal';
    modal.className = 'modal';

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>${body.name} (latinskt namn: ${body.latinName})</h2>
            <p>${body.desc}</p>
        </div>
    `;

    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    closeButton.onclick = closeModal;

    modal.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };

    function closeModal() {
        modal.style.display = 'none';
        modal.remove();
        modal.onclick = null;
        closeButton.onclick = null;
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}