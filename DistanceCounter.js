// DistanceCounter.js
export function setupDistanceCounter(spaceViewId, counterId, maxDistance) {
    const spaceView = document.getElementById(spaceViewId);
    const distanceCounter = document.getElementById(counterId);

    function updateDistance() {
        const scrollPosition = spaceView.scrollLeft; // Get current scroll position
        const maxScroll = spaceView.scrollWidth - spaceView.clientWidth; // Maximum scrollable distance
        const distanceToSun = Math.round((scrollPosition / maxScroll) * maxDistance);

        // Update the counter
        distanceCounter.textContent = `Distance to Sun: ${distanceToSun.toLocaleString()} km`;
    }

    // Initial update in case of any pre-existing scroll
    updateDistance();

    // Add the event listener for scrolling
    spaceView.addEventListener('scroll', updateDistance);
}
