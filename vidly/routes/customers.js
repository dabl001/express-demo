const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const customerSchema = new mongoose.Schema({
    isGold: { type: Boolean, required: true, default: false },
    name: { type: String, required: true, minlength: 1, maxlength: 150 },
    phone: { type: Number, required: true },
});

const Customer = mongoose.model('Customer', customerSchema);

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.send(customer);
    } catch (err) {
        console.error(err.message);
        res.status(404).send('customer with given ID not found!');
    }
});

router.post('/', async (req, res) => {
    if (customerValidation(req.body, res) === true) return;
    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone,
    });
    await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    try {
        if (customerValidation(req.body, res) === true) return;
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    isGold: req.body.isGold,
                    name: req.body.name,
                    phone: req.body.phone,
                },
            },
            { new: true }
        );
        res.send(customer);
    } catch (err) {
        console.error(err.message);
        res.status(404).send('customer with given ID not found!');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        res.send(customer);
    } catch (err) {
        console.error(err.message);
        res.status(404).send('customer with given ID not found');
    }
});

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

module.exports = router;
