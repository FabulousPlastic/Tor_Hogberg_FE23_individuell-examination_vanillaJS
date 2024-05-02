// // DistanceCounter.js
// export function setupDistanceCounter(spaceViewId, counterId, maxDistance) {
//     const spaceView = document.getElementById(spaceViewId);
//     const distanceCounter = document.getElementById(counterId);

//     function updateDistance() {
//         const scrollPosition = spaceView.scrollLeft; // Get current scroll position
//         const maxScroll = spaceView.scrollWidth - spaceView.clientWidth; // Maximum scrollable distance
//         const distanceToSun = Math.round((scrollPosition)) * 10000;

//         // Update the counter
//         distanceCounter.textContent = `Distance to Sun: ${distanceToSun.toLocaleString()} km`;
//     }

//     // Initial update in case of any pre-existing scroll
//     updateDistance();

//     // Add the event listener for scrolling
//     spaceView.addEventListener('scroll', updateDistance);
// }
// DistanceCounter.js
export function setupDistanceCounter(counterId) {
    const distanceCounter = document.getElementById(counterId);

    function animateDistance(newDistance) {
        let currentDistance = parseInt(distanceCounter.textContent.replace(/[^0-9]/g, '')) || 0;
        const duration = 2000; // Duration of the animation in milliseconds
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const distance = Math.min(currentDistance + (newDistance - currentDistance) * (progress / duration), newDistance);
            distanceCounter.textContent = `Avstånd från solen: ${Math.round(distance).toLocaleString()} km`;
            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                distanceCounter.textContent = `Avstånd från solen: ${newDistance.toLocaleString()} km`;
            }
        }

        window.requestAnimationFrame(step);
    }

    return { animateDistance };
}
