import validator from 'validator';
import * as config from '../config.mjs';

const optionsPassword = { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 };

function create(req, res, next) {
    const name = validator.isAlpha(req.body.name);
    const email = validator.isEmail(req.body.email);
    const password = validator.isStrongPassword(req.body.password, optionsPassword);
    const confirmPassword = validator.isStrongPassword(req.body.password, optionsPassword);
    const nickname = validator.isAlpha(req.body.nickname);
    const identicalPassword = password == confirmPassword;

    const bodyValidation = name && email && password && confirmPassword && nickname && identicalPassword;
    const paramUrl =  JSON.stringify({ name, email, password, confirmPassword, nickname, identicalPassword });
    if (bodyValidation) {
        delete req.body.confirmPassword;
        next();
    } else {
        res.redirect(`${config.FRONTEND.SIGNUP}?data=${paramUrl}`);
    }
}

function read(req, res, next) {
    next();
}

function update(req, res, next) {
    next();
}

function remove(req, res, next) {
    const password = validator.isStrongPassword(req.body.password, optionsPassword);
    password ? next() : res.json({ identicalPassword });
}

function patch(req, res, next) {
    delete req.body.session;
    next();
}

export { create, read, update, remove, patch };