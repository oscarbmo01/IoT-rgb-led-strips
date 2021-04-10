import * as http from './http.js';

// fetch validate session
(async () => {
    const config = {
        url: 'http://localhost:3000/index',
        method: 'GET'
    }
    const fetchPromise = http.sendRequest(config);
    await fetchPromise.then(response => response.json()
    ).then(data => {
        data.redirect ? location.href = data.redirect : false;
    });
})();

// fetch read all rgb led strip and user data
(async () => {
    let userData = [];
    let rgbLedStripData = [];
    let config = {};
    let fetchPromise = undefined;

    config = {
        url: 'http://localhost:3000/rgb-led-strip/read',
        method: 'GET'
    }
    fetchPromise = http.sendRequest(config);
    await fetchPromise.then(response => response.json()
    ).then(data => {
        rgbLedStripData = data;
    });

    config = {
        url: 'http://localhost:3000/user/read',
        method: 'GET'
    }
    fetchPromise = http.sendRequest(config);
    await fetchPromise.then(response => response.json()
    ).then(data => {
        data.redirect ? location.href = data.redirect : false;
        userData = data;
    });

    createListRgbStrip(rgbLedStripData, userData);
    
})();

function createListRgbStrip(rgbLedStripData, userData) {
    let newDoc = {};
    const newArray = rgbLedStripData.results.map((doc, i, array) => {
        newDoc = {
            no: i + 1, 
            _key: doc._key, 
            room: doc.room, 
            installationDescription: doc.installationDescription
        }
        userData.rgbLedStrip.map((docb, x, arrayb) => {
            if (docb._key === doc._key) {
                newDoc.color = docb.color;
                newDoc._keyU = docb._key;
            }
        });
        return newDoc;
    });

    let html = "";
    let styleColorLi = `"border-bottom: solid 6px {{color}};"`;
    const li = `<li id="{{_key}}" class="li-strip-light">
                    <span>{{no}}</span>
                    <span>{{_key}}</span>
                    <span id="roomKey{{_key}}">{{room}}</span>
                    <span id="instalDescKey{{_key}}">{{installationDescription}}</span>
                    <span id="colorKey{{_key}}" style=${styleColorLi}>{{color}}</span>
                </li>`;
    const template = Handlebars.compile(li);
    newArray.map((doc, i, array) => {
        doc.color == undefined ? doc.color = "#FFFFFF" : doc.color = doc.color;
        html += template({ 
            no: i + 1, 
            _key: doc._key, 
            room: doc.room, 
            installationDescription: doc.installationDescription,
            color: doc.color
        });
    });
    document.getElementById('ul-list-rgb-led-strip').innerHTML += html;



    const liArray = document.getElementsByClassName('li-strip-light');
    for (let index = 1; index < liArray.length; index++) {
        const element = liArray[index];
        element.addEventListener('click', () => {
            const data = element.innerText.split("\n");
            document.getElementById('_key').value = data[1];
            document.getElementById('room').value = data[2];
            document.getElementById('installation-description').value = data[3];
            document.getElementById('color').value = data[4];
        });
    }
}