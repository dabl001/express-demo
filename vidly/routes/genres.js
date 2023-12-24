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
    try {
        const genre = await Genre.findById(req.params.id);
        res.send(genre);
    } catch (err) {
        console.error(err.message);
        res.status(404).send('Genre with given ID not found!');
    }
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
    try {
        if (genreValidation({ name: req.body.name }, res) === true) return;
        const genre = await Genre.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name,
                },
            },
            { new: true }
        );
        res.send(genre);
    } catch (err) {
        console.error(err.message);
        res.status(404).send('Genre with given ID not found!');
    }
});

router.delete('/:id', [auth, isAdmin], async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        res.send(genre);
    } catch (err) {
        console.error(err.message);
        res.status(404).send('Genre with given ID not found');
    }
});

// async function findGenre(req, res) {
//     try {
//         const id = req.params.id;
//         const genre = await Genre.findById(id).select('id name');
//         res.send(genre);
//         return false;
//     } catch (ex) {
//         console.error(ex.message);
//         res.status(404).send('Genre with given Id not found');
//         return true;
//     }
// }
// async function updateGenre(id, req, res) {
//     try {
//         console.log('Updating genre with ID:', id);
//         const result = await Genre.findByIdAndUpdate(
//             id,
//             {
//                 $set: {
//                     name: 'comedy',
//                 },
//             },
//             { new: true }
//         );
//         res.send(result);
//     } catch (error) {
//         console.error('Failed to update genre', error.message);
//         res.status(404).send('Genre not found');
//     }
// }

// async function createGenre(res) {
//     try {
//         const genre = new Genre({
//             name: req.body.name,
//         });
//         await genre.save();
//         res.send(genre);
//         return genre;
//     } catch (ex) {
//         for (field in ex.errors) console.log(ex.errors[field].message);
//     }
// }

// async function getGenres(req, res) {
//     try {
//         const genres = await Genre.find().select('name id').sort('name');
//         res.send(JSON.stringify(genres));
//     } catch (ex) {
//         for (field in ex.errors) console.log(ex.errors[field].message);
//     }
// }

// async function deleteGenre(id, req, res) {
//     try {
//         console.log('Removing genre with ID:', id);
//         const result = await Genre.findByIdAndDelete(id);
//         if (!result) {
//             res.status(404).send('Genre not found');
//         } else {
//             res.send(result);
//         }
//     } catch (error) {
//         console.error('Failed to delete genre', error.message);
//         res.status(404).send('Genre not found');
//     }
// }

module.exports = router;
