const express = require('express');
const router = express.Router();
const { authenticateToken, checkAdmin } = require('../middleware/auth');

router.get('/', (req, res) => {
    res.render('pages/pos', { title: "POS" });
});

module.exports = router;
