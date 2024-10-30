const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { authenticateToken, checkAdmin } = require('../middleware/auth');

const items = Item.find();

router.get('/', (req, res) => {
    res.redirect('/pos');
});

router.get('/admin/items', checkAdmin, (req, res) => {
    res.json({ message: 'Admin items management', items });
});

module.exports = router;
