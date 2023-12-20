const express = require('express');
const mongoose = require('mongoose');
const { Rental, rentalValidation } = require('../models/rentals');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movies');

const router = express.Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find();
    res.send(rentals);
});

router.get('/:id', (req, res) => {
    res.send('There will be info of single rental');
});

router.post('/', async (req, res) => {
    try {
        if (rentalValidation(req.body, res) === true) return;
        const customer = await Customer.findById(req.body.customerId);
        const movie = await Movie.findById(req.body.movieId);
        if (movie.numberInStock === 0)
            return res.status(400).send('Movie out of stock');
        const rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                isGold: customer.isGold,
                phone: customer.phone,
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate,
                numberInStock: movie.numberInStock,
                genre: movie.genre,
            },
            dateOut: req.body.dateOut,
            dateReturn: req.body.dateReturn,
            rentalFee: req.body.rentalFee,
        });
        await rental.save();
        movie.numberInStock--;
        movie.save();
        res.send(rental);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Error creating rental');
    }
});

module.exports = router;
