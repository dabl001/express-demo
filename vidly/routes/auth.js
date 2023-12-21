const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('../models/users');

const router = express.Router();

router.post('/', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('User with this email doesnt exist!');
    } else if (
        (await bcrypt.compare(req.body.password, user.password)) !== true
    ) {
        return res.status(400).send('Incorrect password!');
    } else {
        const token = user.generateAuthToken();
        res.send(token);
    }
});

module.exports = router;
