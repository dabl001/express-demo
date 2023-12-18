const mongoose = require('mongoose');
const { genreSchema } = require('./genres');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 1, maxlength: 255 },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true, min: 0 },
    dailyRentalRate: { type: Number, required: true, min: 0 },
});

const Movie = mongoose.model('Movie', movieSchema);

function movieValidation(movie, res) {
    if (
        !movie.title ||
        !isNaN(movie.title) ||
        typeof movie.title !== 'string' ||
        isNaN(movie.numberInStock) ||
        typeof movie.numberInStock !== 'number' ||
        isNaN(movie.dailyRentalRate) ||
        typeof movie.dailyRentalRate !== 'number'
    ) {
        res.status(400).send(
            'New movie must have valid values for "title" (string), "numberInStock" (number), and "dailyRentalRate" (number).'
        );
        return true;
    } else {
        return false;
    }
}

// async function updateGenre(movieId, newGenre) {
//     try {
//         const movie = await Movie.findByIdAndUpdate(
//             movieId,
//             {
//                 $set: {
//                     genre: newGenre,
//                 },
//             },
//             {new: true}
//         );
//         movie.save()
//         res.send(movie);
//     } catch (err) {
//         console.error(err);
//         res.status(400).send('Error updating genre of the movie')
//     }
// }

// async function addGenre(movieId, genre, res) {
//     try {
//         const movie = await Movie.findById(movieId);
//         movie.genre.push(genre);
//         movie.save();
//         res.send(movie);
//     } catch (err) {
//         console.error(err.message);
//         removeGenre.status(500).send('Error adding genre to the movie');
//         return;
//     }
// }

// async function removeGenre(movieId, genreId, res) {
//     try {
//         const movie = await Movie.findByIdAndUpdate(
//             movieId,
//             {
//                 $pull: { genre: { _id: genreId } },
//             },
//             { new: true }
//         );
//         if (movie) {
//             res.send(movie);
//         } else {
//             res.status(404).send('Movie with given Id not found');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error removing genre from Movie');
//         return;
//     }
// }

module.exports = { Movie, movieValidation };
