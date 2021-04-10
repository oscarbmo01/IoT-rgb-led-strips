import * as http from './http.js';

async function deleteUser(event) {
    event.preventDefault();
    let formData = new FormData(formDeleteUser);
    let data = {
        password: formData.get('password')
    }
    let config = {
        url: 'http://localhost:3000/user/delete',
        method: 'DELETE',
        data: data
    }
    const fetchPromise = http.sendRequest(config);
    await fetchPromise.then(response => response.json()
    ).then(data => {
        data.redirect ? location.href = data.redirect : false;
    });
}

let formDeleteUser = document.getElementById('formDeleteUser');
formDeleteUser.addEventListener('submit', deleteUser);

let spanMoreOptions = document.getElementById('span-more-options');
spanMoreOptions.addEventListener('click', () => {
    let divOptions = document.getElementById('div-options');
    divOptions.classList.toggle('div-options-more');
    spanMoreOptions.classList.toggle('icon-minus');
});
