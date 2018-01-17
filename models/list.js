const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true},
  category: { type: String, required: true}
});

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  products: [productSchema]
});

module.exports = mongoose.model('List', listSchema);
