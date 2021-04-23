import * as config from '../config.mjs';
import { db, aql } from '../database/connect.mjs';
import { client } from '../services/mqtt.mjs';

const collection = db.collection('users');

function create(req, res, next) {
    collection.save(req.body).then(
        meta => {
            console.log('Document saved:', meta._rev);
            req.body._key = meta._key;
            next();
        },
        err => {
            console.error('Failed to save document:', err);
            res.redirect(`${config.FRONTEND.SIGNUP}?data={ err: 'create'}`);
        }
    );
}

function read(req, res, next) {
    collection.document(req.body._key).then(
        doc => {
            console.log('Document:', JSON.stringify(doc, null, 2));
            doc.rgbLedStrip.map((strip) => {
                client.publish(strip.topic, `{ "color": ${JSON.stringify(strip.color)} }`);
            });
            res.json({
                rgbLedStrip: doc.rgbLedStrip 
            });
        },
        err => console.error('Failed to fetch document:', err)
    );
}

function remove(req, res, next) {
    db.query(
        `FOR doc IN users
            FILTER doc._key == '${req.body._key}' && doc.password == '${req.body.password}' 
            REMOVE doc IN users
            RETURN doc`
    ).then(
        cursor => cursor.all()
    ).then(
        doc => {
            console.log('Remove doc collection users:', doc);
            if (doc[0] != undefined) {
                res.clearCookie('token').json({ redirect: config.FRONTEND.LOGIN });
            } else {
                res.json({ redirect: `${config.FRONTEND.INDEX}?data={ err: 'remove' }`});
            }
        },
        err => {
            console.error('Failed to execute query:', err);
        }
    );
}


function getDocumentKey(req, res, next) {
    let paramUrl =  { user: null };

    db.query(
        `FOR doc IN users
            FILTER doc.email == '${req.body.email}' && doc.password == '${req.body.password}' 
            RETURN doc`
    ).then(
        cursor => cursor.all()
    ).then(
        doc => {
            console.log('doc:', doc);
            if (doc[0] != undefined) {
                req.body._key = doc[0]._key;
                next();
            } else {
                res.redirect(`${config.FRONTEND.LOGIN}?data=${JSON.stringify(paramUrl)}`);
            }
        },
        err => {
            console.error('Failed to execute query:', err);
        }
    );
}

function patch(req, res, next) {
    db.query(
        `FOR doc IN users
            FILTER doc._key == '${req.body._key}' 
            RETURN doc`
    ).then(
        cursor => cursor.all()
    ).then(
        doc => {
            doc[0].rgbLedStrip.forEach((element, index) => {
                if (element._key == req.body._keyRgbLedStrip) {
                    doc[0].rgbLedStrip[index].color = req.body.color.toUpperCase();
                    const data = {
                        rgbLedStrip: doc[0].rgbLedStrip 
                    };
                    collection.update(req.body._key, data).then(
                        meta => {
                            console.log('Document updated:', meta._rev)
                            res.json({ 
                                _key: element._key,
                                color: req.body.color,
                                room: req.body.room,
                                installationDescription: req.body.installationDescription
                            });

                            const collection = db.collection('rgbLedStrip');
                            collection.document(element._key).then(
                                doc => {
                                    console.log('Document:', JSON.stringify(doc, null, 2));
                                    client.publish(doc.topic, `{ "color": "${req.body.color}" }`);
                                },
                                err => console.error('Failed to fetch document:', err)
                            );
                        },
                        err => console.error('Failed to update document:', err)
                    );
                }
            });
        },
        err => {
            console.error('Failed to execute query:', err);
        }
    );
}

export { create, read, remove, getDocumentKey, patch }