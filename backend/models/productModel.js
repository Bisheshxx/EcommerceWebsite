const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name!!"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Product description!!"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price!!"],
    maxLength: [8, "Price cannot exceed 8 characters!"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter a Category!"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock!"],
    maxLength: [4, "Stock cannot exceed 4 characters!"],
    default: 1,
  },
  numOfReview: {
    type: Number,
    default: 0,
  },
  review: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
