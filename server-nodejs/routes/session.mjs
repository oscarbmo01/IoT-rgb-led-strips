import express from 'express';

import * as ctrlSession from '../controllers/session.mjs';

import * as modelUser from '../models/user.mjs';

import * as modelSession from '../models/session.mjs';

import * as servicejwt from '../services/json-web-token.mjs';


const router = express.Router();

router.get('/login', ctrlSession.validate, ctrlSession.checkPathAccess);
router.get('/index', ctrlSession.validate, ctrlSession.checkPathAccess);
router.get('/logout', ctrlSession.logout);

router.get('/used-strip', ctrlSession.validate, modelSession.updateUsedStrip);

router.post('/login', ctrlSession.validate, ctrlSession.checkPathAccess, 
ctrlSession.login, modelUser.getDocumentKey, servicejwt.encode);

export { router as routerSession };