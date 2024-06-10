
// Handles parallax animation
export function updateParallax() {
    const spaceView = document.getElementById('space-view');
    const scrollLeft = spaceView.scrollLeft;
    document.querySelectorAll('.parallax-layer').forEach(layer => {
        const depth = parseFloat(layer.style.getPropertyValue('--depth'));
        const movement = -(scrollLeft * depth);
        layer.style.transform = `translateX(${movement}px) scale(calc(1 + ${depth}))`;
    });
}

let scrollAnimationFrameId = null; 
// Handles scroll animations
export function scrollToPlanet(index, targetDistance) {
    //Sets start and end positions
    const spaceView = document.getElementById('space-view');
    const planetDiv = document.getElementById(`body-${index}`);
    const endLeft = planetDiv.offsetLeft + planetDiv.offsetWidth / 2 - spaceView.offsetWidth / 2;
    const startLeft = spaceView.scrollLeft;
    const distanceToScroll = endLeft - startLeft;

    // Settings for animation speed
    const minDuration = 2500; // Minimum duration in milliseconds
    const maxSpeed = 0.8; // Maximum pixels scrolled per millisecond
    
    const requiredDuration = Math.abs(distanceToScroll) / maxSpeed;
    const finalDuration = Math.max(requiredDuration, minDuration); 
    let startTime = null;

    // Distance counter
    const distanceCounter = document.getElementById('distance-to-sun');
    let currentDistance = parseInt(distanceCounter.textContent.replace(/[^\d]/g, '')) || 0;

    // Ease-in-out function: accelerates and then decelerates
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }


    //Synchronizes scrolling and distance counter
    function scrollStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const timeElapsed = timestamp - startTime;
        const progress = timeElapsed / finalDuration;

        // Apply the easing function to the progress
        const easedProgress = easeInOutQuad(progress);

        spaceView.scrollLeft = startLeft + distanceToScroll * easedProgress;

        // Simultaneously update the distance counter
        const intermediateDistance = currentDistance + (targetDistance - currentDistance) * easedProgress;
        distanceCounter.textContent = `Avstånd från solen: ${Math.round(intermediateDistance).toLocaleString()} km`;

        if (timeElapsed < finalDuration) { 
            scrollAnimationFrameId = requestAnimationFrame(scrollStep);
        } else {
            if (scrollAnimationFrameId) {
                cancelAnimationFrame(scrollAnimationFrameId);
                scrollAnimationFrameId = null;
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
