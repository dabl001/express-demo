const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'action' },
    { id: 2, name: 'drama' },
    { id: 3, name: 'horror' },
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    if (findGenre(genres, req, res) === true) return;
    res.send(genres[parseInt(req.params.id) - 1]);
});

router.post('/', (req, res) => {
    const genre = { id: genres.length + 1, name: req.body.name };
    if (genreValidation(genre, res) === true) return;
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    if (findGenre(genres, req, res) === true) return;
    const genre = { id: parseInt(req.params.id), name: req.body.name };
    if (genreValidation(genre, res) === true) return;
    genres[genre.id - 1] = genre;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    if (findGenre(genres, req, res) === true) return;
    const id = parseInt(req.params.id);
    const genre = genres[id - 1];
    genres.splice(id - 1, 1);
    res.send(genre);
});

function findGenre(genres, req, res) {
    const id = parseInt(req.params.id);
    const genre = genres[id - 1];
    if (!genre) {
        res.status(404).send('Genre with given Id not found');
        return true;
    } else return false;
}

function genreValidation(genre, res) {
    if (!genre.name || !isNaN(genre.name)) {
        res.status(400).send(
            'new genre must have <name> and it must be string type'
        );
        return true;
    } else return false;
}

module.exports = router;
