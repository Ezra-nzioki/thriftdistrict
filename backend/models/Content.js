const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true }, // e.g., 'hero', 'features'
  data: { type: mongoose.Schema.Types.Mixed }, // Flexible object for content
});

module.exports = mongoose.model('Content', contentSchema);