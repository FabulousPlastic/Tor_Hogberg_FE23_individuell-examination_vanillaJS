// Function to get the API key
async function getApiKey() {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
        method: 'POST'
    });

    if (response.ok) {
        const data = await response.json();
        return data.key;
    } else {
        throw new Error('Failed to retrieve API key');
    }
}

// Use the function and log the API key
getApiKey().then(apiKey => {
    console.log('API Key:', apiKey);
}).catch(error => {
    console.error('Error:', error);
});


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
        return bodies; // This should contain the celestial bodies
    } else {
        throw new Error('Failed to retrieve celestial bodies');
    }
}

// Main function to get the API key and then fetch and log the celestial bodies
async function main() {
    try {
        const apiKey = await getApiKey();
        const bodies = await fetchBodies(apiKey);
        console.log('Celestial Bodies:', bodies);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Execute the main function
main();




let currentIndex = 0; // Start at the first celestial body
const bodies = [ /* Your array of celestial bodies */ ];

function updateCelestialInfo(index) {
    const body = bodies[index];
    const infoDiv = document.getElementById('celestial-info');
    infoDiv.innerHTML = `<h2>${body.name} (${body.latinName})</h2>
                         <p>Type: ${body.type}</p>
                         <p>Rotation Period: ${body.rotation}</p>`;
}

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

// Initialize with the first celestial body
updateCelestialInfo(currentIndex);




