const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 150,
    },
});

const Genre = mongoose.model('Genre', genreSchema);

function genreValidation(genre, res) {
    if (!genre.name || !isNaN(genre.name)) {
        res.status(400).send(
            'new genre must have unique <name> and it must be string type'
        );
        return true;
    } else return false;
}

module.exports = { Genre, genreValidation, genreSchema };
