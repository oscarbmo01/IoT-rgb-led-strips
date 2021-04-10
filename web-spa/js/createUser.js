import * as http from './http.js';

(function validateSession() {
    const config = {
        url: 'http://localhost:3000/user/create',
        method: 'GET'
    }
    const fetchPromise = http.sendRequest(config);
    fetchPromise.then(response => response.json()
    ).then(data => {
        data.redirect ? location.href = data.redirect : false;
    });
})();
