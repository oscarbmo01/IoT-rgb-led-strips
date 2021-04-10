import * as config from '../config.mjs';
import { Database, aql } from 'arangojs';

const db = new Database({
    url: config.DB.HOST,
    databaseName: config.DB.NAME,
    auth: { username: config.DB.AUTH.USERNAME, password: config.DB.AUTH.PASSWORD }
});


// const schema = {
//     rule: {
//         properties: { 
//             name: { type: 'string' },
//             email: { types: 'string' },
//             nickname: { type: 'string' },
//             password: { type: 'string',  minLength: 8 }
//         },
//         level: 'strict',
//         message: 'Customer Schema Validation Failed.'
//     }
// }


// db.create("schemaCollection", { "schema": schema });

export { db, aql };