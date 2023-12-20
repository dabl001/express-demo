const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const { User, userValidation } = require('../models/users');

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.post('/', async (req, res) => {
    const result = await userValidation(req.body, res);
    if (result === true) return;
    const email = await User.findOne({ email: req.body.email });
    if (!email) {
        const user = new User(_.pick(req.body, ['name', 'email', 'password']));
        await user.save();
        res.send(_.pick(user, ['name', 'email']));
    } else {
        res.status(400).send('User with this email already exists!');
    }
});

module.exports = router;
