// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken, checkAdmin } = require('../middleware/auth');

// Registration route
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    
    try {
        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new user instance and save it to the database
        const newUser = new User({ username, password, role });
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate a JWT token (you can store this in cookies or local storage on the client-side)
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, 'yourSecretKey', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/admin/register/new', authenticateToken, checkAdmin, async (req, res) => {
    const { username, password } = req.body
    
    try {
        const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

        const newAdmin = new User({
            username: username,
            password: password,
            role: "admin"
        });
        await newAdmin.save()

        res.status(201).json({ message: "Admin registerd successfully" })
    } catch (err) {
        console.error('Login error: ', err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
