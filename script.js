// Function som hämtar APInyckel
async function getApiKey() {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
        method: 'POST'
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);//Kontrollerade vad som returnerades...
        return data.key; // för att kunna veta att det var "key" och inte ApiKey eller ngt annat.
    } else {
        throw new Error('Failed to retrieve API key');
    }
}

// Function som hämtar datan "bodies" via APIn
async function fetchBodies(apiKey) {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
        method: 'GET',
        headers: {
            'x-zocom': apiKey
        }
    });

    if (response.ok) {
        const bodies = await response.json();
        console.log(bodies);//samma som ovan, ville kolla på hur det som returnerades såg ut.
        return bodies.bodies;
    } else {
        throw new Error('Failed to retrieve bodies');
    }
}

// Modify your main function to use the fetched bodies
let bodies = []; // Initialize an empty array for celestial bodies

async function main() {
    try {
        const apiKey = await getApiKey();
        bodies = await fetchBodies(apiKey); // 'bodies' contains the array from the API
        bodies.forEach((body, index) => {
            createCelestialBody(body, index); // Create visual representation for each body
        });
        updateCelestialInfo(0); // Initialize with the first celestial body
    } catch (error) {
        console.error('Error:', error);
    }
}

function createCelestialBody(body, index) {
    const sizeScale = 10; // Adjust this scale as needed
    const size = Math.sqrt(body.circumference) / sizeScale; // Simplified example
    const planetDiv = document.createElement('div');
    planetDiv.className = `celestial-body ${body.type.toLowerCase()}`;
    planetDiv.id = `body-${index}`;
    planetDiv.style.width = `${size}px`;
    planetDiv.style.height = `${size}px`;

    // Change the color based on the type of the celestial body
    if (body.type.toLowerCase() === 'planet') {
        planetDiv.style.backgroundColor = '#8888ff'; // Example for planets
    } else if (body.type.toLowerCase() === 'star') {
        planetDiv.style.backgroundColor = '#ffff00'; // Example for stars
    } // Add more conditions for different types

    document.getElementById('space-view').appendChild(planetDiv);
}


function updateCelestialInfo(index) {
    const body = bodies[index];
    const infoDiv = document.getElementById('celestial-info');
    const celestialBodies = document.querySelectorAll('.celestial-body');

    // Immediately update information without fading for new info
    infoDiv.innerHTML = `<h2>${body.name} (${body.latinName})</h2>
                         <p>Type: ${body.type}</p>
                         <p>Rotation Period: ${body.rotation} days</p>
                         <p>Other details can go here...</p>`; // Add more details as needed

    // Highlight selected body without fading effect for the info box
    celestialBodies.forEach((div, idx) => {
        div.style.opacity = idx === index ? 1 : 0.2;
        if (idx === index) {
            div.style.zIndex = 10; // Bring to front
        } else {
            div.style.zIndex = 1; // Send to back
        }
    });
}

// Corrected event listeners for navigation buttons
document.getElementById('next').addEventListener('click', () => {
    if (currentIndex < bodies.length - 1) {
        currentIndex++;
        updateCelestialInfo(currentIndex);
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCelestialInfo(currentIndex);
    }
});

// Ensure this line is outside of the main function to avoid resetting currentIndex on each call
let currentIndex = 0; // Start at the first celestial body
main(); // Call main to initialize the page with data
