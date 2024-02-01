const express = require('express');
const error = require('../middlewares/error');
const main = require('../routes/main');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/vidly.com', main);
    app.use('/vidly.com/api/genres', genres);
    app.use('/vidly.com/api/customers', customers);
    app.use('/vidly.com/api/movies', movies);
    app.use('/vidly.com/api/rentals', rentals);
    app.use('/vidly.com/api/users', users);
    app.use('/vidly.com/api/auth', auth);
    app.use(error);
};
