import validator from 'validator';
import * as jwt from '../services/json-web-token.mjs';
import * as config from '../config.mjs';
import { writeLog } from '../log/logger.mjs';

function login(req, res, next) {
    const nameLogger = 'controller', name = 'session', process = 'login';
    writeLog({ nameLogger, name, process, msg: 'Start of the process', type: 'trace' });

    const email = validator.isEmail(req.body.email);
    const password = validator.isStrongPassword(req.body.password, { 
        minLength: 8, 
        minLowercase: 0, 
        minUppercase: 0, 
        minNumbers: 0, 
        minSymbols: 0
    });

    const bodyValidation = email && password;
    const paramUrl =  JSON.stringify({ email, password });
    if (bodyValidation) {
        next();
        writeLog({ nameLogger, name, process, msg: `Execution successful>data: ${paramUrl}`, type: 'info' });
    } else {
        res.redirect(`${config.FRONTEND.LOGIN}?data=${paramUrl}`);
        writeLog({ nameLogger, name, process, msg: `Execution unsuccessful>data: ${paramUrl}`, type: 'warn' });
    }
}

function logout(req, res, next) {
    const nameLogger = 'controller', name = 'session', process = 'logout';
    writeLog({ nameLogger, name, process, msg: 'Start of the process', type: 'trace' });

    res.clearCookie('token');
    res.redirect(config.FRONTEND.LOGIN);
}

function validate(req, res, next) {
    const nameLogger = 'controller', name = 'session', process = 'validate';
    writeLog({ nameLogger, name, process, msg: 'Start of the process', type: 'trace' });

    let sessionStatus = undefined;
    if (req.cookies.token) {
        sessionStatus = jwt.decode(req, res, next);
        if (sessionStatus == false) {
            return res.clearCookie('token').json({ redirect: config.FRONTEND.INDEX });
        }
    }
    req.body.session = sessionStatus;
    next();
}

function checkOperationAccess(req, res, next) {
    req.body.session == undefined ? res.json({ redirect: config.FRONTEND.LOGIN }) : next();
}

function checkPathAccess(req, res, next) {
    if (req.method == 'POST' && (req.originalUrl == '/login' || '/create')) {
        req.body.session == undefined ? next() : res.redirect(config.FRONTEND.INDEX);
        return true;
    }
    if (req.method == 'GET' && req.originalUrl == '/index') {
        req.body.session == undefined ? res.json({ redirect: config.FRONTEND.LOGIN }) : res.json({}); 
        return true;
    }
    req.body.session == undefined ? res.json({}) : res.json({ redirect: config.FRONTEND.INDEX });
}

export { login, logout, validate , checkPathAccess, checkOperationAccess };