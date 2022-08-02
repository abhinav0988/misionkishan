const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    Amount: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
