const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    items: [
        {
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            quantity: { type: Number, required: true }
        }
    ],
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
