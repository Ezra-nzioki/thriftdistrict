const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: String, default: 'guest' }, // For now, no user auth for clients
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    image: String,
    price: Number,
    quantity: Number
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // pending, completed, etc.
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);