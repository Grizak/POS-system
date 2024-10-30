const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    description: { type: String },
    category: { type: String }
});

module.exports = mongoose.model('Item', itemSchema);
