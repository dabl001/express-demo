const mongoose = require('mongoose');

module.exports = function () {
  mongoose
    .connect('mongodb+srv://dabl01:Abyl2001@cluster0.4oqyp.mongodb.net/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));
};
