import * as modelRgbLedStrip from '../models/rgbLedStrip.mjs';

function publish(client, body) {
    if (body.target == 'register') {
        client.publish(body.topic, '{ "msg": "registration in process" }');        
        delete body.target;
        const doc = modelRgbLedStrip.create(body, client);
    }
}

export { publish };