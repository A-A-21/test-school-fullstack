const { Schema, model } = require('mongoose');

const User = new Schema({
  username: { type: String, required: true },
  useremail: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }],
  password: { type: String, required: true }
});

module.exports = model('User', User);
