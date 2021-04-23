import validator from 'validator';
import * as jwt from '../services/json-web-token.mjs';
import * as config from '../config.mjs';

function login(req, res, next) {
    const nameLogger = 'controller', name = 'session', process = 'login';

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
    } else {
        res.redirect(`${config.FRONTEND.LOGIN}?data=${paramUrl}`);
    }
}

function logout(req, res, next) {
    const nameLogger = 'controller', name = 'session', process = 'logout';

    res.clearCookie('token');
    res.redirect(config.FRONTEND.LOGIN);
}

function validate(req, res, next) {
    const nameLogger = 'controller', name = 'session', process = 'validate';

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