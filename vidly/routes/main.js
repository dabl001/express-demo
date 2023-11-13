const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Response from the server');
});

module.exports = router;
