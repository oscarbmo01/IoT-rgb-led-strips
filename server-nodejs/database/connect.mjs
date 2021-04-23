import * as config from '../config.mjs';
import { Database, aql } from 'arangojs';

const db = new Database({
    url: config.DB.HOST,
    databaseName: config.DB.NAME,
    auth: { username: config.DB.AUTH.USERNAME, password: config.DB.AUTH.PASSWORD }
});

export { db, aql };