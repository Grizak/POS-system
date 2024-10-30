const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    purchaseHistory: [
        {
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            date: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Customer', customerSchema);
