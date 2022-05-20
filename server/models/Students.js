const { Schema, model } = require('mongoose');

const Student = new Schema({
  usernname: { type: String, required: true },
  useremail: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = model('Student', Student);
