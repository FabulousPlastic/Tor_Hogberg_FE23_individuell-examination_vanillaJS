export function updateNavigationButtons(bodies, currentIndex) {
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const prevCelestial = bodies[(currentIndex - 1 + bodies.length) % bodies.length];
    const nextCelestial = bodies[(currentIndex + 1) % bodies.length];
    prevBtn.textContent = prevCelestial.name;
    nextBtn.textContent = nextCelestial.name;

    if (currentIndex === 0) {
        prevBtn.style.display = 'none'; // Hide previous button at first index
    } else {
        prevBtn.style.display = 'block'; // Show previous button otherwise
    }

    if (currentIndex === bodies.length - 1) {
        nextBtn.style.display = 'none'; // Hide next button at last index
    } else {
        nextBtn.style.display = 'block'; // Show next button otherwise
    }
}
