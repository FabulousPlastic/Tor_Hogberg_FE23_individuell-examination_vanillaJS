// Function to get the API key
async function getApiKey() {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
        method: 'POST'
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data.key; // Make sure this matches the actual key name in the response
    } else {
        throw new Error('Failed to retrieve API key');
    }
}

// Function to fetch celestial bodies using the API key
async function fetchBodies(apiKey) {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
        method: 'GET',
        headers: {
            'x-zocom': apiKey // Use the API key for authentication
        }
    });

    if (response.ok) {
        const bodies = await response.json();
        console.log(bodies);
        return bodies.bodies; // Adjust this based on the actual structure of your API response
    } else {
        throw new Error('Failed to retrieve celestial bodies');
    }
}

// Modify your main function to use the fetched bodies
let bodies = []; // Initialize an empty array for celestial bodies

async function main() {
    try {
        const apiKey = await getApiKey();
        bodies = await fetchBodies(apiKey); // Now 'bodies' contains the array from the API
        updateCelestialInfo(0); // Initialize with the first celestial body
    } catch (error) {
        console.error('Error:', error);
    }
}

// Execute the main function
main();

function updateCelestialInfo(index) {
    const body = bodies[index];
    const infoDiv = document.getElementById('celestial-info');
    infoDiv.innerHTML = `<h2>${body.name} (${body.latinName})</h2>
                         <p>Type: ${body.type}</p>
                         <p>Rotation Period: ${body.rotation}</p>`;
}

let currentIndex = 0; // Start at the first celestial body
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

function updateCelestialInfo(index) {
    const body = bodies[index];
    const infoDiv = document.getElementById('celestial-info');
    const celestialDiv = document.getElementById('celestial-body');

    // Update the celestial body class for different backgrounds
    celestialDiv.className = `celestial-body ${body.type.toLowerCase()}`; // e.g., 'sun', 'planet'

    // Animate "travel" by scaling down and fading out the info
    celestialDiv.style.transform = 'scale(0.5)';
    infoDiv.classList.replace('info-shown', 'info-hidden');

    // After "travel", update the info and scale back up
    setTimeout(() => {
        infoDiv.innerHTML = `<h2>${body.name} (${body.latinName})</h2>
                             <p>Type: ${body.type}</p>
                             <p>Rotation Period: ${body.rotation}</p>`;
        celestialDiv.style.transform = 'scale(1)';
        infoDiv.classList.replace('info-hidden', 'info-shown');
    }, 2000); // Adjust time based on your transition
}

// Update your next and previous button event listeners as needed to handle the new animations
