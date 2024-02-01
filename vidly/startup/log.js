require('winston-mongodb');
const winston = require('winston');

module.exports = function () {
    process.on('uncaughtException', (ex) => {
        winston.error(ex.message, ex);
        process.exit(1);
    });

    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(
        new winston.transports.MongoDB({
            db: 'mongodb+srv://dabl01:Abyl2001@cluster0.4oqyp.mongodb.net/vidly',
        })
    );
};
