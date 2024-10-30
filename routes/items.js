const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { authenticateToken, checkAdmin } = require('../middleware/auth');

// Route to get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to add a new item
router.post('/add', checkAdmin, async (req, res) => {
    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        category: req.body.category
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to update an item by ID
router.put('/update/:id', checkAdmin, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        // Update fields if provided in the request
        if (req.body.name) item.name = req.body.name;
        if (req.body.price) item.price = req.body.price;
        if (req.body.quantity) item.quantity = req.body.quantity;
        if (req.body.description) item.description = req.body.description;
        if (req.body.category) item.category = req.body.category;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete an item by ID
router.delete('/delete/:id', checkAdmin, async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        
        res.json({ message: "Item deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
