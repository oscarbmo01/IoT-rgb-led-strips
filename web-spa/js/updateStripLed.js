import * as http from './http.js';

async function updateRgbLedStripUser(event) {
    event.preventDefault();
    let formData = new FormData(formPatchUser);
    let data = {
        _keyRgbLedStrip: formData.get('_key'),
        room: formData.get('room'),
        installationDescription: formData.get('installation-description'),
        color: formData.get('color')
    }
    let config = {
        url: 'http://localhost:3000/user/patch',
        method: 'PATCH',
        data: data
    }
    const fetchPromise = http.sendRequest(config);
    await fetchPromise.then(response => response.json()
    ).then(data => {
        data.redirect ? location.href = data.redirect : false;
        let span = document.getElementById(`colorKey${data._key}`);
        span.innerText = data.color.toUpperCase();
        span.style.borderColor = data.color.toUpperCase();

        document.getElementById(`roomKey${data._key}`).innerText = data.room;
        document.getElementById(`instalDescKey${data._key}`).innerText = data.installationDescription;
    });
}

let formPatchUser = document.getElementById('form-edit-value-strip-light');
formPatchUser.addEventListener('submit', updateRgbLedStripUser);