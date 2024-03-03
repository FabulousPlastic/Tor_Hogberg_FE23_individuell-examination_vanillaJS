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


// }
export function scrollToPlanet(index) { // Removed default duration parameter since we'll calculate it dynamically
    const spaceView = document.getElementById('space-view');
    const planetDiv = document.getElementById(`body-${index}`);
    const startLeft = spaceView.scrollLeft;
    const endLeft = planetDiv.offsetLeft + planetDiv.offsetWidth / 2 - spaceView.offsetWidth / 2;
    const distanceToScroll = endLeft - startLeft;

    // Assuming you want to enforce a minimum scroll time (maximum speed)
    const minDuration = 1500; // Minimum duration in milliseconds
    const maxSpeed = 0.7; // Maximum pixels per millisecond
    const requiredDuration = Math.abs(distanceToScroll) / maxSpeed;
    const finalDuration = Math.max(requiredDuration, minDuration); // Use the greater of requiredDuration and minDuration

    let startTime = null;

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

        if (timeElapsed < finalDuration) { // Use finalDuration here
            window.requestAnimationFrame(scrollStep); // Continue moving
        }
    }

    window.requestAnimationFrame(scrollStep);
}
