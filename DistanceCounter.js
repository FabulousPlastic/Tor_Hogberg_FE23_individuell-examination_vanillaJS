
// export function setupDistanceCounter(counterId) {
//     const distanceCounter = document.getElementById("distance-to-sun");

//     function animateDistance(newDistance) {
//         let currentDistance = parseInt(distanceCounter.textContent.replace(/[^0-9]/g, '')) || 0;
//         const duration = 2000; // Duration of the animation in milliseconds
//         let start = null;

//         function step(timestamp) {
//             if (!start) start = timestamp;
//             const progress = timestamp - start;
//             const distance = Math.min(currentDistance + (newDistance - currentDistance) * (progress / duration), newDistance);
//             distanceCounter.textContent = `Avstånd från solen: ${Math.round(distance).toLocaleString()} km`;
//             if (progress < duration) {
//                 window.requestAnimationFrame(step);
//             } else {
//                 distanceCounter.textContent = `Avstånd från solen: ${newDistance.toLocaleString()} km`;
//             }
//         }

//         window.requestAnimationFrame(step);
//     }

//     return { animateDistance };
// }
// export function setupDistanceCounter(counterId) {
//     const distanceCounter = document.getElementById("distance-to-sun");

//     function animateDistance(index) {
//         let currentDistance = parseInt(distanceCounter.textContent.replace(/[^0-9]/g, '')) || 0;
//         const spaceView = document.getElementById('space-view');
//         const planetDiv = document.getElementById(`body-${index}`);
//         const startScroll = spaceView.scrollLeft;
//         const endScroll = planetDiv.offsetLeft + planetDiv.offsetWidth / 2 - spaceView.offsetWidth / 2;/* calculate end scroll position based on newDistance */;
//         const distanceToScroll = endScroll - startScroll;

//         // Assuming you want to enforce a minimum scroll time (maximum speed)
//         const minDuration = 1000; // Minimum duration in milliseconds
//         const maxSpeed = 10.0; // Maximum pixels per millisecond
//         const requiredDuration = Math.abs(distanceToScroll) / maxSpeed;
//         const finalDuration = Math.max(requiredDuration, minDuration); // Use the greater of requiredDuration and minDuration

//         let startTime = null;

//         function easeInOutQuad(t) {
//             return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
//         }

//         function scrollStep(timestamp) {
//             if (!startTime) startTime = timestamp;
//             const timeElapsed = timestamp - startTime;
//             const progress = timeElapsed / finalDuration; // Use finalDuration here

//             // Apply the easing function to the progress
//             const easedProgress = easeInOutQuad(progress);

//             spaceView.scrollLeft = startScroll + distanceToScroll * easedProgress; // Calculate current position based on eased progress

//             if (timeElapsed < finalDuration) { // Use finalDuration here
//                 window.requestAnimationFrame(scrollStep); // Continue scrolling
//             }
//         }

//         window.requestAnimationFrame(scrollStep);
//     }

//     return { animateDistance };
// // }
// export function setupDistanceCounter(counterId) {
//     const distanceCounter = document.getElementById(counterId);

//     function animateDistance(newDistance, currentIndex) {
//         const spaceView = document.getElementById('space-view');
//         const startScroll = spaceView.scrollLeft;
        
//         // Get the div of the current planet
//         const planetDiv = document.getElementById(`body-${currentIndex}`);
//         // Calculate the end scroll position based on the position of the planet div
//         const endScroll = planetDiv.offsetLeft + planetDiv.offsetWidth / 2 - spaceView.offsetWidth / 2;
//         const distanceToScroll = endScroll - startScroll;

//         const minDistance = parseInt(distanceCounter.textContent.replace(/[^0-9]/g, '')) || 0; // Get the current distance from the counter

//         let startTime = null;

//         function step(timestamp) {
//             if (!startTime) startTime = timestamp;
//             const progress = (spaceView.scrollLeft - startScroll) / distanceToScroll;
//             const currentDistance = minDistance + (newDistance - minDistance) * progress;
//             distanceCounter.textContent = `Avstånd från solen: ${Math.round(currentDistance).toLocaleString()} km`;
            
//             if (progress < 1) {
//                 window.requestAnimationFrame(step);
//             } else {
//                 distanceCounter.textContent = `Avstånd från solen: ${newDistance.toLocaleString()} km`;
//             }
//         }

//         window.requestAnimationFrame(step);
//     }

//     return { animateDistance };
// }
// DistanceCounter.js
// export function setupDistanceCounter(counterId) {
//     const distanceCounter = document.getElementById(counterId);
//     let currentAnimatedDistance = parseInt(distanceCounter.textContent.replace(/[^0-9]/g, '')) || 0;

//     function animateDistance(newDistance) {
//         const duration = 500; // Duration for the distance counter animation
//         let start = null;

//         function step(timestamp) {
//             if (!start) start = timestamp;
//             const progress = Math.min((timestamp - start) / duration, 1);
//             const interpolatedDistance = currentAnimatedDistance + (newDistance - currentAnimatedDistance) * progress;
//             distanceCounter.textContent = `Avstånd från solen: ${Math.round(interpolatedDistance).toLocaleString()} km`;

//             if (progress < 1) {
//                 window.requestAnimationFrame(step);
//             } else {
//                 currentAnimatedDistance = newDistance;
//             }
//         }

//         window.requestAnimationFrame(step);
//     }

//     return { animateDistance };
// }
// DistanceCounter.js
// This module will handle the smooth animation of the distance counter based on user scroll interactions.

// export function setupDistanceCounter(counterId) {
//     const distanceCounter = document.getElementById(counterId);
//     let currentAnimatedDistance = parseInt(distanceCounter.textContent.replace(/[^0-9]/g, '')) || 0;

//     function animateDistance(newDistance) {
//         // The duration of the animation can be adjusted to make the change quicker or slower.
//         // A shorter duration makes the animation more responsive to scroll changes.
//         const duration = 300; // Duration in milliseconds for the distance counter animation
//         let start = null;

//         function step(timestamp) {
//             if (!start) start = timestamp;
//             const progress = Math.min((timestamp - start) / duration, 1);
//             const interpolatedDistance = currentAnimatedDistance + (newDistance - currentAnimatedDistance) * progress;

//             // Update the displayed distance with each animation frame.
//             distanceCounter.textContent = `Distance: ${Math.round(interpolatedDistance).toLocaleString()} km`;

//             if (progress < 1) {
//                 requestAnimationFrame(step); // Continue the animation until we reach the end of the duration.
//             } else {
//                 currentAnimatedDistance = newDistance; // Ensure the final distance matches the intended target distance.
//                 distanceCounter.textContent = `Distance: ${newDistance.toLocaleString()} km`; // Final update for exact value.
//             }
//         }

//         requestAnimationFrame(step); // Start the animation sequence.
//     }

//     return { animateDistance };
// }
// export function setupDistanceCounter(counterId) {
//     const distanceCounter = document.getElementById(counterId);
//     let currentDistance = parseInt(distanceCounter.textContent.replace(/[^\d]/g, '')) || 0;

//     function animateDistance(newDistance) {
//         const change = newDistance - currentDistance;
//         const duration = Math.abs(change) > 1000000 ? 1000 : 500; // Faster animation for larger changes

//         let start = null;
//         function step(timestamp) {
//             if (!start) start = timestamp;
//             const elapsed = timestamp - start;
//             const progress = Math.min(elapsed / duration, 1);
//             const intermediateDistance = currentDistance + change * progress;
//             distanceCounter.textContent = `Avstånd från solen: ${Math.round(intermediateDistance).toLocaleString()} km`;

//             if (progress < 1) {
//                 requestAnimationFrame(step);
//             } else {
//                 currentDistance = newDistance;
//                 distanceCounter.textContent = `Avstånd från solen: ${newDistance.toLocaleString()} km`;
//             }
//         }

//         requestAnimationFrame(step);
//     }

//     return { animateDistance };
// }
// export function setupDistanceCounter(counterId) {
//     const distanceCounter = document.getElementById(counterId);
//     let currentDistance = parseInt(distanceCounter.textContent.replace(/[^\d]/g, '')) || 0;
//     let animationFrameId = null; // To keep track of the animation frame

//     function animateDistance(newDistance) {
//         if (animationFrameId) {
//             // cancelAnimationFrame(animationFrameId); // Cancel any ongoing animation
//         }
//         const change = newDistance - currentDistance;
//         const duration = 500; // Keep a constant duration or adjust based on change magnitude if needed
//         let startTime = null;

//         function step(timestamp) {
//             if (!startTime) startTime = timestamp;
//             const elapsed = timestamp - startTime;
//             const progress = Math.min(elapsed / duration, 1);
//             const intermediateDistance = currentDistance + change * progress;
//             distanceCounter.textContent = `Avstånd från solen: ${Math.round(intermediateDistance).toLocaleString()} km`;

//             if (progress < 1) {
//                 animationFrameId = requestAnimationFrame(step);
//             } else {
//                 currentDistance = newDistance; // Update current distance after animation
//                 distanceCounter.textContent = `Avstånd från solen: ${newDistance.toLocaleString()} km`;
//             }
//         }

//         animationFrameId = requestAnimationFrame(step);
//     }

//     return { animateDistance };
// }
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
