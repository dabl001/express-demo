const express = require('express');
const mongoose = require('mongoose');
const { Genre, genreValidation } = require('../models/genres');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid ID format');
    }
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404).send('Genre with given ID not found!');
    }
    res.send(genre);
});

router.post('/', auth, async (req, res) => {
    if (genreValidation({ name: req.body.name }, res) === true) return;
    const genre = new Genre({
        name: req.body.name,
    });
    await genre.save();
    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid ID format');
    }
    let genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404).send('Genre with given ID not found!');
    }
    if (genreValidation({ name: req.body.name }, res) === true) return;
    genre = await Genre.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                name: req.body.name,
            },
        },
        { new: true }
    );
    res.send(genre);
});

router.delete('/:id', [auth, isAdmin], async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid ID format');
    }
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404).send('Genre with given ID not found!');
    }
    genre = await Genre.findByIdAndDelete(req.params.id);
    res.send(genre);
    res.status(404).send('Genre with given ID not found');
});

module.exports = router;
