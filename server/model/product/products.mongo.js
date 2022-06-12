const mongoose = require("mongoose");
const Float = require("mongoose-float").loadType(mongoose);

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
  },
  price: {
    price_id: {
      type: String,
    },
    amount: {
      type: Float,
    },
  },
  size: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

module.exports = mongoose.model("Products", productSchema);
