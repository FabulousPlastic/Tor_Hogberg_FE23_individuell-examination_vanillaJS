export function updateNavigationButtons(bodies, currentIndex) {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const prevIndex = (currentIndex - 1 + bodies.length) % bodies.length;
    const nextIndex = (currentIndex + 1) % bodies.length;
    prevButton.textContent = bodies[prevIndex].name;
    nextButton.textContent = bodies[nextIndex].name;
}
