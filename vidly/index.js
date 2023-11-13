const express = require('express');
const main = require('./routes/main');
const genres = require('./routes/genres');

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/vidly.com', main);
app.use('/vidly.com/api/genres', genres);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
