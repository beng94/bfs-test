var winston = require('winston');

var logger;
if (process.env.NODE_ENV !== 'test') {
    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)()
        ]
    });
} else {
    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({ filename: 'test/test.log' })
        ]
    });
}


module.exports = logger;
