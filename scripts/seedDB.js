const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/globeMarkers"
);

const markerSeed = [
  {
    city: 'Singapore',
    color: 'red',
    coordinates: [1.3521, 103.8198],
    value: 50,
  },
  {
    city: 'New York',
    color: 'blue',
    coordinates: [40.73061, -73.935242],
    value: 25,
  },
  {
    city: 'San Francisco',
    color: 'orange',
    coordinates: [37.773972, -122.431297],
    value: 35,
  },
  {
    city: 'Beijing',
    color: 'gold',
    coordinates: [39.9042, 116.4074],
    value: 135,
  },
  {
    city: 'London',
    color: 'green',
    coordinates: [51.5074, 0.1278],
    value: 80,
  },
  {
    city: 'Los Angeles',
    color: 'gold',
    coordinates: [29.7604, -95.3698],
    value: 54,
  },
];

db.Marker
  .remove({})
  .then(() => db.Marker.collection.insertMany(markerSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });