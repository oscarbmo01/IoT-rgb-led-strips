import * as http from './http.js';

(function validateSession() {
    let config = {
        url: 'http://localhost:3000/login',
        method: 'GET'
    }
    const fetchPromise = http.sendRequest(config);
    fetchPromise.then(response => response.json()
    ).then(data => {
        data.redirect ? location.href = data.redirect : false;
    });
})();