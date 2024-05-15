// Function to create and display a celestial body within a given container on the UI.
export function createCelestialBody(body, index) {
    // Access the container element where celestial bodies will be displayed.
    const spaceView = document.getElementById('space-view');

    // Calculate the base distance from the Sun, converting the distance from km to a more manageable pixel value,
    // and adjust it to dynamic viewport widths for responsive design.
    const baseDistance = (body.distance) / 100000; // Simplifies the astronomical distance to a usable size in dvw.

    // Set a distance increment based on the container's width plus an extra 1000 pixels, adapting to dynamic viewport changes.
    const distanceIncrement = spaceView.clientWidth + 1000; // Ensures sufficient spacing between celestial bodies.

    // Define a scaling factor for adjusting the size of the celestial body visually.
    const sizeScale = 8;
    // Calculate the display size of the celestial body by taking the square root of its circumference
    // and dividing it by the size scale to produce a reasonable size in dvw.
    const size = Math.sqrt(body.circumference) / sizeScale;

    // Create a new div element to visually represent the celestial body.
    const planetDiv = document.createElement('div');
    // Assign class names for styling based on body type and name, and an ID incorporating the index for unique identification.
    planetDiv.className = `celestial-body ${body.type.toLowerCase()} ${body.name.toLowerCase()}`;
    planetDiv.id = `body-${index}`;

    //Mars actual distance 228 000 000 km
    //Venus actual distance 108 200 000 km

    // Apply CSS styles to position and size the celestial body using dynamic viewport units.
    planetDiv.style.width = `${size}dvw`;
    planetDiv.style.maxWidth = `${70 + (size / 10)}dvw`;
    planetDiv.style.maxHeight = `${70 + (size / 10)}dvw`;
    planetDiv.style.height = `${size}dvw`;
    planetDiv.style.position = 'absolute';
    // Position the celestial body horizontally within the space view container based on its index and calculated distances.
    planetDiv.style.left = `${baseDistance + (distanceIncrement * index * 4)}px`; // Calculates the left offset in dvw.

    // Append the newly created celestial body div to the 'space-view' container.
    document.getElementById('space-view').appendChild(planetDiv);
}
