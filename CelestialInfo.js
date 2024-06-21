// Updates name/information about the currently displayed celestial body.
export function updateCelestialInfo(bodies, currentIndex) {
    const body = bodies[currentIndex];
    const infoDiv = document.getElementById('info-square');

    infoDiv.innerHTML = `
    <h3>Närmaste himlakropp är:</h3>
    <button id="more-info">${body.name}</button>
    `;

    document.getElementById('more-info').addEventListener('click', () => displayModal(body));
}

// Displays a modal with additional information about the celestial body.
function displayModal(body) {
    const modal = document.createElement('div');
    modal.id = 'celestial-modal';
    modal.className = 'modal';

    modal.innerHTML = `
        <div class="modal-content">            
            <h2>${body.name}</h2>
            <p>(latinskt namn: ${body.latinName})</p>
            <p>${body.desc}</p>
            <button class="close-button">Stäng</button>
        </div>
    `;

    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    closeButton.onclick = closeModal;

    function closeModal() {
        modal.style.display = 'none';
        modal.remove();
        closeButton.onclick = null;
        window.removeEventListener('click', outsideClickListener);
    }

    function outsideClickListener(event) {
        if (!modal.contains(event.target)) {
            closeModal();
        }
    }
    //Listener with timeout to prevent closeModal triggering before modal is created
    setTimeout(() => {
        window.addEventListener('click', outsideClickListener);
    }, 100);
}