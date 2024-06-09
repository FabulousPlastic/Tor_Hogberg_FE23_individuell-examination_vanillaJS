export function updateNavigationButtons(bodies, currentIndex) {
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const prevCelestial = bodies[(currentIndex - 1 + bodies.length) % bodies.length];
    const nextCelestial = bodies[(currentIndex + 1) % bodies.length];
    prevBtn.textContent = prevCelestial.name;
    nextBtn.textContent = nextCelestial.name;

    // Reset disabled states if any
    prevBtn.disabled = false;
    nextBtn.disabled = false;

    // Adjust button text and disable it if at the bounds
    if (currentIndex === 0) {
        prevBtn.textContent = 'För varmt!';
        prevBtn.disabled = true; 
    } else {
        prevBtn.textContent = prevCelestial.name;
    }

    if (currentIndex === bodies.length - 1) {
        nextBtn.textContent = 'För långt bort!';
        nextBtn.disabled = true; 
    } else {
        nextBtn.textContent = nextCelestial.name;
    }
}
