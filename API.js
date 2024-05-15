// API.js

// Function to retrieve an API key from a remote server.
export async function getApiKey() {
    // Perform a POST request to the specified API URL.
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
        method: 'POST'
    });
    // Check if the HTTP response status is "OK" (status code 200-299).
    if (response.ok) {
        // Parse the JSON body of the response.
        const data = await response.json();
        console.log(data); // Log the data for debugging purposes.
        return data.key; // Return the API key extracted from the JSON data.
    } else {
        // Throw an error if the request failed (e.g., due to network issues or server errors).
        throw new Error('Failed to retrieve API key');
    }
}

// Function to fetch celestial bodies data using the provided API key.
export async function fetchBodies(apiKey) {
    // Perform a GET request to the API with the API key included in the request headers.
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
        method: 'GET',
        headers: {
            'x-zocom': apiKey // Custom header to include the API key for authentication.
        }
    });
    // Check if the HTTP response status is "OK".
    if (response.ok) {
        // Parse the JSON body of the response to get the celestial bodies data.
        let bodies = await response.json();

        // Hardcoded corrections
        bodies.bodies.forEach(body => {
            if (body.name.toLowerCase() === 'mars') {
                body.distance = 228000000;  // Correct distance for Mars
            } else if (body.name.toLowerCase() === 'venus') {
                body.distance = 108200000;  // Correct distance for Venus
            }
        });

        return bodies.bodies;
    } else {
        throw new Error('Failed to retrieve bodies');
    }
}