// Parallax.js
export function updateParallax() {
    const spaceView = document.getElementById('space-view');
    const scrollLeft = spaceView.scrollLeft;
    document.querySelectorAll('.parallax-layer').forEach(layer => {
        const depth = parseFloat(layer.style.getPropertyValue('--depth'));
        const movement = -(scrollLeft * depth);
        layer.style.transform = `translateX(${movement}px) scale(calc(1 + ${depth}))`;
    });
}


let scrollAnimationFrameId = null;  // This makes it accessible within all functions in this file
export function scrollToPlanet(index, targetDistance) {
    const spaceView = document.getElementById('space-view');
    const planetDiv = document.getElementById(`body-${index}`);
    const endLeft = planetDiv.offsetLeft + planetDiv.offsetWidth / 2 - spaceView.offsetWidth / 2;
    const startLeft = spaceView.scrollLeft;
    const distanceToScroll = endLeft - startLeft;

    // Assuming you want to enforce a minimum scroll time (maximum speed)
    const minDuration = 1500; // Minimum duration in milliseconds
    const maxSpeed = 10.0; // Maximum pixels per millisecond
    const requiredDuration = Math.abs(distanceToScroll) / maxSpeed;
    const finalDuration = Math.max(requiredDuration, minDuration); // Use the greater of requiredDuration and minDuration

    let startTime = null;

    // Fetch the current distance from the distance counter
    const distanceCounter = document.getElementById('distance-to-sun');
    let currentDistance = parseInt(distanceCounter.textContent.replace(/[^\d]/g, '')) || 0;

    // Ease-in-out function: accelerates and then decelerates
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function scrollStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const timeElapsed = timestamp - startTime;
        const progress = timeElapsed / finalDuration; // Use finalDuration here

        // Apply the easing function to the progress
        const easedProgress = easeInOutQuad(progress);

        spaceView.scrollLeft = startLeft + distanceToScroll * easedProgress; // Calculate current position based on eased progress

        // Simultaneously update the distance counter
        const intermediateDistance = currentDistance + (targetDistance - currentDistance) * easedProgress;
        distanceCounter.textContent = `Avstånd från solen: ${Math.round(intermediateDistance).toLocaleString()} km`;

        if (timeElapsed < finalDuration) { // Use finalDuration here
            scrollAnimationFrameId = requestAnimationFrame(scrollStep); // Continue moving
        } else {
            if (scrollAnimationFrameId) {
                cancelAnimationFrame(scrollAnimationFrameId); // Ensure only scroll-related animations are cancelled
                scrollAnimationFrameId = null; // Clear the animation frame ID when done
            }
            // Once scrolling is complete, ensure the distance counter shows the final exact distance
            distanceCounter.textContent = `Avstånd från solen: ${Math.round(targetDistance).toLocaleString()} km`;
        }
    }

    if (scrollAnimationFrameId) {
        cancelAnimationFrame(scrollAnimationFrameId); // Ensure only scroll-related animations are cancelled
    }
    scrollAnimationFrameId = requestAnimationFrame(scrollStep);
}
