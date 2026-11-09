const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String },
  sizes: { type: [String], default: [] },
  stock: { type: Number, default: 0 },
  rating: { type: Number, min: 1, max: 5 },
  reviewCount: { type: Number, min: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);