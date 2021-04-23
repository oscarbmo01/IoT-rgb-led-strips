import * as config from '../config.mjs';
import jwt from 'jwt-simple';
import moment from 'moment';

function encode(req, res, next) {
    const payload = { 
        alg: 'HS256',
        typ: 'JWT',
        sub: req.body._key,
        iat: moment().unix(),
        exp: null
    };
    const token = jwt.encode(payload, config.SECRET);
    const options = {
        httpOnly: true, 
        secure: true,
        expires: new Date(moment().add(config.TOKEN.EXPIRES, 'minute'))
    }
    res.cookie('token', token, options).redirect(config.FRONTEND.LOGIN);
}


function decode(req, res, next) {
    try {
        const payload = jwt.decode(req.cookies.token, config.SECRET);
        req.body._key = payload.sub;
        return true;
    } catch (error) {
        console.log('error de token: ', error)
        return false;
    }
}

export { encode, decode }