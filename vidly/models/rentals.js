const mongoose = require('mongoose');
const { customerSchema } = require('./customer');
const { movieSchema } = require('./movies');

const rentalSchema = new mongoose.Schema({
    customer: { type: customerSchema, required: true },
    movie: { type: movieSchema, required: true },
    dateOut: { type: Date, required: true, default: Date.now },
    dateReturn: { type: Date },
    rentalFee: { type: Number, min: 0 },
});

const Rental = mongoose.model('Rental', rentalSchema);

function rentalValidation(rental, res) {
    const isDate = (dateString) => !isNaN(Date.parse(dateString));
    if (
        typeof rental.dateOut !== 'string' ||
        !isDate(rental.dateOut) ||
        typeof rental.dateReturn !== 'string' ||
        !isDate(rental.dateReturn) ||
        isNaN(rental.rentalFee) ||
        typeof rental.rentalFee !== 'number'
    ) {
        res.status(400).send(
            'New rental must have valid values for "dateOut" (date in object), "dateReturn" (date in object), and "rentalFee" (number).'
        );
        return true;
    } else {
        return false;
    }
}

module.exports = { Rental, rentalValidation };
