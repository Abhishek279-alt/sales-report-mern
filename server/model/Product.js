const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: String,
  description: String,
  category: String,
  image: String,
  sold: String,
  dateOfSale: String,
});

module.exports = mongoose.model("products", productSchema);
