export function updateNavigationButtons(bodies, currentIndex) {
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const prevCelestial = bodies[(currentIndex - 1 + bodies.length) % bodies.length];
    const nextCelestial = bodies[(currentIndex + 1) % bodies.length];

    // Reset disabled states if any
    prevBtn.disabled = false;
    nextBtn.disabled = false;

    // Adjust button text and disable it if at the bounds
    if (currentIndex === 0) {
        prevBtn.innerHTML = `
        <button class="pushable" id="prev">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
            För varmt!
            </span>
        </button>`;
        prevBtn.disabled = true; 
    } else {
        prevBtn.innerHTML = `
        <button class="pushable" id="prev">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
            ${prevCelestial.name}
            </span>
        </button>`;
    }

    if (currentIndex === bodies.length - 1) {
        nextBtn.innerHTML = `
        <button class="pushable" id="next">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
            För långt bort!
            </span>
        </button>`;
        nextBtn.disabled = true; 
    } else {
        nextBtn.innerHTML = `<button class="pushable" id="next">
        <span class="shadow"></span>
        <span class="edge"></span>
        <span class="front">
        ${nextCelestial.name}
        </span>
        </button>`;
    }
}
