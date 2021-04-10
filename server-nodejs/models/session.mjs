import * as config from '../config.mjs';
import { db } from '../database/connect.mjs';

const collection = db.collection('session');

function checkActive(req, res, next) {
    db.query('FOR doc IN session RETURN { _key: doc._key, _keyUser: doc._keyUser }').then(
        cursor => cursor.all()
    ).then(
        docs => {
            if (docs[0]['_keyUser'] == req.body._key) {
                next();
            } else {
                res.json({ redirect: `${config.FRONTEND.WARNING}?data={ err: 'usaged' }`});
            }
        },
        err => console.error('Failed to execute query:', err)
    );
}

function updateUsedStrip(req, res, next) {
    db.query('FOR doc IN session RETURN { _key: doc._key, _keyUser: doc._keyUser }').then(
        cursor => cursor.all()
    ).then(
        docs => {
            collection.update(docs[0]['_key'], { _keyUser: req.body._key }).then(
                meta => {
                    console.log(req.body._key);
                    console.log('Document updated:', meta._rev);
                    res.redirect(config.FRONTEND.INDEX);
                },
                err => console.error('Failed to update document:', err)
            );
        },
        err => console.error('Failed to execute query:', err)
    );
}

export { checkActive, updateUsedStrip };