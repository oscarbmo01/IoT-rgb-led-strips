async function sendRequest(config) {
    return fetch(config.url, {
        method: config.method,
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(config.data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch (error => {
        console.error('Error:', error);
        location.href = 'http://localhost:5501/error.html'
    });
}

export { sendRequest };