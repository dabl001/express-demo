const jwt = require('jsonwebtoken');
const config = require('config');

function isAdmin(req, res, next) {
    try {
        if (req.user.isAdmin === true) {
            next();
        } else {
            res.status(400).send(
                'You dont have a permission for this operation!'
            );
        }
    } catch (ex) {
        console.error(ex.message);
        //401 unauthorized, 403 forbidden
        return res.status(400).send('Invalid token');
    }
}

module.exports = isAdmin;
