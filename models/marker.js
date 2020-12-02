const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const markerSchema = new Schema({
  city: {
    type: String
  },
  color: {
    type: String
  },
  coordinates: {
    type: [Number]
  },
  value: {
    type: Number
  } 
});

const Marker = mongoose.model("Marker", markerSchema);

module.exports = Marker;
