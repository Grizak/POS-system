const express = require('express');
const router = express.Router();
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken, checkAdmin } = require('../middleware/auth');

const transactions = [];

router.post('/checkout', async (req, res) => {
    const { items, total } = req.body;

    const transaction = { id: transactions.length + 1, items, total, date: new Date() };
    transactions.push(transaction);

    res.status(201).json({ message: "Transaction successfull" });
});

router.get('/transactions', (req, res) => {
    res.json(transactions);
});

module.exports = router;
