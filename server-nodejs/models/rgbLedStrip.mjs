import { db } from '../database/connect.mjs';

const collection = db.collection('rgbLedStrip');

function create(payload, client) {
    db.query(`FOR doc IN rgbLedStrip FILTER doc.chipId == ${payload.chipId} RETURN doc.key`).then(
        cursor => cursor.all()
    ).then(
        keys => {
            if (keys.length == 0) {
                collection.save(payload).then(
                    meta => {
                        console.log('Document saved:', meta._rev);
                        client.publish(payload.topic, `{ "msg": "Successful registration" }`);
                        update(payload, meta._key);   
                    },
                    err => console.error('Failed to save document:', err)
                );
            } else {
                client.publish(payload.topic, `{ "msg": "The device is already registered" }`);
            }
        },
        err => console.error('Failed to execute query:', err)
    );
}

function read(req, res, next) {
    db.query(`FOR doc IN rgbLedStrip RETURN { _key: doc._key, defaultColor: doc.defaultColor, room: doc.room, installationDescription: doc.installationDescription }`
    ).then(
        cursor => cursor.all()
    ).then(
        results => {
            res.json({ results });
            next();
        },
        err => console.error('Failed to execute query:', err)
    );
}

function readAll(req, res, next) {
    db.query('FOR doc IN rgbLedStrip RETURN {_key: doc._key, color: doc.defaultColor}').then(
        cursor => cursor.all()
    ).then(
        results => {
            console.log('Read All:', results);
            req.body.rgbLedStrip = results;
            next();
        },
        err => console.error('Failed to execute query:', err)
    );
}

function update(payload, key) {
    let collection = db.collection('users');
    collection.all().then(
        cursor => cursor.map(user => {
            const data = {
                _key: key,
                color: payload.defaultColor,
                topic: payload.topic
            };
            user.rgbLedStrip.push(data);
            collection.update(user._key, { rgbLedStrip: user.rgbLedStrip }).then(
                meta => console.log('Document updated:', meta._rev),
                err => console.error('Failed to update document:', err)
            );
        })
    ).then(
        keys => console.log('All keys:', keys.join(', ')),
        err => console.error('Failed to fetch all documents:', err)
    ); 
}

function remove(req, res, next) {

}

function patch(req, res, next) {
    const data = {
        room: req.body.room,
        installationDescription: req.body.installationDescription
    };
    collection.update(req.body._keyRgbLedStrip, data).then(
        meta => {
            console.log('Document rgb updated:', meta._rev);
            next();
        },
        err => console.error('Failed to update document:', err)
    );
}

export { create, read, update, remove, readAll, patch };