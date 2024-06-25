export function updateNavigationButtons(bodies, currentIndex) {
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const prevCelestial = bodies[(currentIndex - 1 + bodies.length) % bodies.length];
    const nextCelestial = bodies[(currentIndex + 1) % bodies.length];
    const searchError = document.getElementById('search-error');

    // Adjust button text and error message if at the bounds
    if (currentIndex === 0) {
        prevBtn.innerHTML = `
        <button class="pushable" id="prev">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
            För varmt!
            </span>
        </button>`;
        prevBtn.onclick = () => {
            if (currentIndex === 0) {
                searchError.innerHTML = `För varmt står det ju... <br> Dit kan vi inte åka!>`;
                searchError.style.display = 'block';
                setTimeout(() => {
                    searchError.style.display = 'none';
                }, 3000);
            }
        };

        
    } else {
        prevBtn.innerHTML = `
        <button class="pushable" id="prev">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front">
            ${prevCelestial.name}
            </span>
        </button>`;
        prevBtn.onclick = null;
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
        nextBtn.onclick = () => {
            if (currentIndex === bodies.length - 1) {
                searchError.innerHTML = `För långt bort stär det ju... <br> Vi kommer aldrig hitta hem!`;
                searchError.style.display = 'block';
                setTimeout(() => {
                    searchError.style.display = 'none';
                }, 3000);
            }
        };
    } else {
        nextBtn.innerHTML = `<button class="pushable" id="next">
        <span class="shadow"></span>
        <span class="edge"></span>
        <span class="front">
        ${nextCelestial.name}
        </span>
        </button>`;
        nextBtn.onclick = null;
    }
}
