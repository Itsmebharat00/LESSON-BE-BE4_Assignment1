/** @format */

const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  publishYear: {
    type: Number,
    require: true,
  },
  genre: {
    type: [String],
  },
  language: {
    type: String,
  },
  country: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  summary: {
    type: String,
  },
  coverImageUrl: {
    type: String,
  },
});

const Books = mongoose.model("Books", BookSchema);

module.exports = Books;
