const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First Name is Required"
  },

  lastName: {
    type: String,
    trim: true,
    required: "Last Name is Required",
  },

  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },

  subject: {
    type: String,
  },

  userCreated: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;