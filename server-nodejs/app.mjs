import * as config from './config.mjs';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { routerSession } from './routes/session.mjs';
import { routerUser } from './routes/user.mjs';
import { routerRgbLedStrip } from './routes/rgbLedStrip.mjs';
import * as mqtt from './services/mqtt.mjs';

const app = express();
const port = process.env.PORT || config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: config.FRONTEND, credentials: true }));
app.use('/', routerSession);
app.use('/user', routerUser);
app.use('/rgb-led-strip', routerRgbLedStrip);

app.listen(port, () => {
  console.log(`API RGB LED Strip listening at ${config.HOST}:${config.PORT}`); 
  mqtt.connect();
});