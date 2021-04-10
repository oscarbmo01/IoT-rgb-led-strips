import express from 'express';

import * as ctrlSession from '../controllers/session.mjs';
import * as ctrlUser from '../controllers/user.mjs';
import * as ctrlRgbLedStrip from '../controllers/rgbLedStrip.mjs';

import * as modelUser from '../models/user.mjs';
import * as modelRgbLedStrip from '../models/rgbLedStrip.mjs';
import * as modelSession from '../models/session.mjs';

import * as servicejwt from '../services/json-web-token.mjs';


const router = express.Router();

router.get('/create', ctrlSession.validate, ctrlSession.checkPathAccess);
router.get('/read', ctrlSession.validate, ctrlSession.checkOperationAccess, modelSession.checkActive, modelUser.read);
router.post('/create', ctrlSession.validate, ctrlSession.checkPathAccess, ctrlUser.create, 
modelRgbLedStrip.readAll, modelUser.create, servicejwt.encode);
router.patch('/patch', ctrlSession.validate, ctrlSession.checkOperationAccess, modelSession.checkActive,
ctrlUser.patch, ctrlRgbLedStrip.patch, modelRgbLedStrip.patch, modelUser.patch);
router.delete('/delete', ctrlSession.validate, ctrlSession.checkOperationAccess, 
ctrlUser.remove, modelUser.remove);

export { router as routerUser };