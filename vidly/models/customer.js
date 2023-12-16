const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold: { type: Boolean, required: true, default: false },
    name: { type: String, required: true, minlength: 1, maxlength: 150 },
    phone: { type: Number, required: true },
});

const Customer = mongoose.model('Customer', customerSchema);

function customerValidation(customer, res) {
    if (
        !customer.name ||
        !isNaN(customer.name) ||
        typeof customer.name !== 'string' ||
        typeof customer.isGold !== 'boolean' ||
        isNaN(customer.phone) ||
        typeof customer.phone !== 'number'
    ) {
        res.status(400).send(
            'New customer must have valid values for "name" (string), "isGold" (boolean), and "phone" (number).'
        );
        return true;
    } else {
        return false;
    }
}

module.exports = { Customer, customerValidation };
