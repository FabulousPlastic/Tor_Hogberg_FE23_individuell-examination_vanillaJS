export function setupDistanceCounter(counterId) {
    const distanceCounter = document.getElementById(counterId);
    let currentDistance = parseInt(distanceCounter.textContent.replace(/[^\d]/g, '')) || 0;
    let distanceAnimationFrameId = null; // Separate ID for tracking distance animation frames

    function animateDistance(newDistance) {
        if (distanceAnimationFrameId) {
            cancelAnimationFrame(distanceAnimationFrameId); // Cancel only distance-related animations
        }
        const change = newDistance - currentDistance;
        const duration = 5; // Adjusted duration to balance visual feedback and performance
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const intermediateDistance = currentDistance + change * progress;
            distanceCounter.textContent = `Avstånd från solen: ${Math.round(intermediateDistance).toLocaleString()} km`;

            if (progress < 1) {
                distanceAnimationFrameId = requestAnimationFrame(step);
            } else {
                currentDistance = newDistance;
                distanceCounter.textContent = `Avstånd från solen: ${newDistance.toLocaleString()} km`;
                // No need to update the ID to null here since it's at the end of the animation
            }
        }

        distanceAnimationFrameId = requestAnimationFrame(step);
    }

    return { animateDistance };
}
