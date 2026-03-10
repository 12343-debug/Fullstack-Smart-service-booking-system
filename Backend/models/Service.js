
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,  
    required: true,
    trim: true,
  },
  image: {
    type: String,  
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  estimatedDuration: {
    type: String,
    required: true,
    trim: true,
    default: "60 mins",
  },
});

module.exports = mongoose.model("Service",serviceSchema);
