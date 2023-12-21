const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 155 },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
        maxlength: 255,
    },
    password: { type: String, required: true, minlength: 8, maxlength: 100 },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

async function userValidation(user, res) {
    if (
        !user.name ||
        !isNaN(user.name) ||
        typeof user.name !== 'string' ||
        !user.email ||
        typeof user.email !== 'string' ||
        !user.password ||
        typeof user.password !== 'string'
    ) {
        res.status(400).send(
            'New user must have valid values for "name" (string), "email" (string), and "pasword" (string).'
        );
        return true;
    } else {
        return false;
    }
}

module.exports = { User, userSchema, userValidation };
