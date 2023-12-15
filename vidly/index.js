const express = require('express');
const main = require('./routes/main');
const genres = require('./routes/genres');
const mongoose = require('mongoose');

const app = express();

mongoose
    .connect('mongodb+srv://dabl01:Abyl2001@cluster0.4oqyp.mongodb.net/')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/vidly.com', main);
app.use('/vidly.com/api/genres', genres);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
