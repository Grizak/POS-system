const express = require('express');
const router = express.Router();
const { authenticateToken, checkAdmin } = require('../middleware/auth');
const User = require('../models/User')

router.get('/login', (req, res) => {
    res.render('pages/login', { title: "Login" });
});

router.get('/register', (req, res) => {
    res.render('pages/register');
});

router.get('/admin/register', authenticateToken, checkAdmin, (req, res) => {
    res.render('pages/admin/register');
});

module.exports = router;
