// Retrieves API key
export async function getApiKey() {
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

// Fetches celestial bodies from API above.
export async function fetchBodies(apiKey) {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
        method: 'GET',
        headers: {
            'x-zocom': apiKey
        }
    });

    if (response.ok) {
        let bodies = await response.json();
        // Hard coding correct data where API returns incorrect data
        bodies.bodies.forEach(body => {
            if (body.name.toLowerCase() === 'mars') {
                body.distance = 228000000;
            } else if (body.name.toLowerCase() === 'venus') {
                body.distance = 108200000;
            }
        });
        return bodies.bodies;
    } else {
        throw new Error('Failed to retrieve bodies');
    }
}