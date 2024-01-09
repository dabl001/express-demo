require('express-async-errors');
const express = require('express');
const winston = require('winston');
const error = require('./middlewares/error');
const mongoose = require('mongoose');
const config = require('config');
const main = require('./routes/main');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

winston.add(
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' })
);

if (!config.get('jwtPrivateKey')) {
    console.error('ERROR: jwtPrivateKey is not defined');
    process.exit(1);
} //to set environment  export vidly_jwtPrivateKey=mySecureKey

mongoose
    .connect('mongodb+srv://dabl01:Abyl2001@cluster0.4oqyp.mongodb.net/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

//middlewares
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

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
