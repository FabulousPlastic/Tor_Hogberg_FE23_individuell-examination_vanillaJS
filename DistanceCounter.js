
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
