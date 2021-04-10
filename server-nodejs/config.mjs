const NODE_ENV = process.env.NODE_ENV || 'development';
const HOST = process.env.HOST || 'http://127.0.0.1';
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || 'mal-igna';
const DB = {
    HOST: process.env.HOST || 'http://localhost:8529',
    NAME: process.env.DB || 'IOTSTRIPRGBLED',
    AUTH: {
        USERNAME: 'root',
        PASSWORD: 'bmo'
    }
};

const TOKEN = {
    EXPIRES: 60
};

const BROKER = {
    HOST: 'mqtt://localhost',
    PORT: 1883
};

const FRONTEND = {
    INDEX: 'http://localhost:5501/index.html',
    LOGIN: 'http://localhost:5501/login.html',
    SIGNUP: 'http://localhost:5501/sign-up.html',
    ERROR: 'http://localhost:5501/error.html',
    WARNING: 'http://localhost:5501/warning.html'
};

export { NODE_ENV, HOST, PORT, SECRET, FRONTEND, DB, TOKEN, BROKER };