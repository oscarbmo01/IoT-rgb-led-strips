import express from 'express';
import * as ctrlSession from '../controllers/session.mjs';
import * as modelRgbLedStrip from '../models/rgbLedStrip.mjs';

const router = express.Router();

router.get('/read', ctrlSession.validate, ctrlSession.checkOperationAccess, modelRgbLedStrip.read);

export { router as routerRgbLedStrip };