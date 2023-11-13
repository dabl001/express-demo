function log(req, res, next) {
    console.log('Logging...');
    next();
}

function authentificating(req, res, next) {
    console.log('Authentificating...');
    next();
}

module.exports = { log, authentificating };
