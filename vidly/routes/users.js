const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, userValidation } = require('../models/users');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const result = await userValidation(req.body, res);
    if (result === true) return;
    const email = await User.findOne({ email: req.body.email });
    if (!email) {
        const user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
    } else {
        res.status(400).send('User with this email already exists!');
    }
});

module.exports = router;
