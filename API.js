// API.js
export async function getApiKey() {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
        method: 'POST'
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data.key;
    } else {
        throw new Error('Failed to retrieve API key');
    }
}

export async function fetchBodies(apiKey) {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
        method: 'GET',
        headers: {
            'x-zocom': apiKey
        }
    });
    if (response.ok) {
        const bodies = await response.json();
        console.log(bodies);
        return bodies.bodies;
    } else {
        throw new Error('Failed to retrieve bodies');
    }
}
