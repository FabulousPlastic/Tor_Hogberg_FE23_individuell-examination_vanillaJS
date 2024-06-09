// Renders celestial bodies
export function createCelestialBody(bodies) {
    bodies.forEach((body, index) => {
        const spaceView = document.getElementById('space-view');
        const viewportWidth = window.innerWidth;
        
        // Sets celestial body distance based on actual distance and viewport width
        const distanceScale = 20000000;
        const baseDistance = (body.distance) / distanceScale * viewportWidth;        

        // Sets celestial body size based on circumference and viewport width
        const sizeScale = 1000;
        const size = Math.sqrt(body.circumference) / sizeScale * viewportWidth;

        const planetDiv = document.createElement('div');
        planetDiv.className = `celestial-body ${body.type.toLowerCase()} ${body.name.toLowerCase()}`;
        planetDiv.id = `body-${index}`;

        // Positions the Sun then the other planets relative the Sun.
        if (index === 0) {
            planetDiv.style.left = `${20}px`;
        } else {
            const solDiv = document.getElementById('body-0');
            const solRect = solDiv.getBoundingClientRect();
            const solRight = 20 + solRect.width;
            planetDiv.style.left = `${solRight + baseDistance}px`;
           
        }

        planetDiv.style.width = `${size}px`;
        planetDiv.style.height = `${size}px`;
        planetDiv.style.position = 'absolute';

        spaceView.appendChild(planetDiv);
    });
}