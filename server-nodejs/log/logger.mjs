import log4js from 'log4js';

log4js.configure({
    appenders: { 
        app: { type: 'file', filename: './log/app.log' },
        controller: { type: 'file', filename: './log/controller.log' },
        model: { type: 'file', filename: './log/model.log' }
    },
    categories: { 
        default: { appenders: ['app'], level: 'all' },
        controller: { appenders: ['controller'], level: 'all' },
        model: { appenders: ['model'], level: 'all' }
    }
});

function writeLog({
    nameLogger = undefined,
    name = undefined,
    process = undefined,
    msg = undefined,
    type = undefined }
    ) {
    return true;
    const logger = log4js.getLogger(nameLogger);
    switch (type) {
        case 'trace':
            logger.trace({ name, process, msg });
            break;
        case 'info':
            logger.info({ name, process, msg });
            break;
        case 'warn':
            logger.warn({ name, process, msg });
            break;  
        default:
            break;
    }
}

export { writeLog };