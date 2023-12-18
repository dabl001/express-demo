const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
    Movie,
    movieValidation,
    addGenre,
    removeGenre,
} = require('../models/movies');
const { Genre } = require('../models/genres');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.send(movie);
    } catch (err) {
        console.error(err.message);
        res.status(404).send('movie with given ID not found!');
    }
});

router.post('/', async (req, res) => {
    try {
        if (movieValidation(req.body, res) === true) return;
        const genre = await Genre.findById(req.body.genreId);
        const movie = new Movie({
            title: req.body.title,
            genre: { _id: genre._id, name: genre.name },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
        });
        await movie.save();
        res.send(movie);
    } catch (err) {
        console.error(err.message);
        res.status(404).send('Genre not found');
    }
});
// router.put('/:id', async (req, res) => {
//     try {
//         if (movieValidation(req.body, res) === true) return;
//         const movie = await Movie.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set: {
//                     title: req.body.title,
//                     genre: req.body.genres,
//                     numberInStock: req.body.numberInStock,
//                     dailyRentalRate: req.body.dailyRentalRate,
//                 },
//             },
//             { new: true }
//         );
//         res.send(movie);
//     } catch (err) {
//         console.error(err.message);
//         res.status(404).send('movie with given ID not found!');
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const movie = await Movie.findByIdAndDelete(req.params.id);
//         res.send(movie);
//     } catch (err) {
//         console.error(err.message);
//         res.status(404).send('movie with given ID not found');
//     }
// });

module.exports = router;
