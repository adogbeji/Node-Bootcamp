// jshint esversion:6
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {  // Object here is the schema-type options
    type: String,
    required: [true, 'A tour must have a name!'], // Array contains error to be shown if required field is missing
    unique: true  // Prevents insertion of two documents with the same name
  },
  rating: {
    type: Number,
    default: 4.5  // Value to be used if field is missing
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price!']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
