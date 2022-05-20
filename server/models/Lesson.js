const { Schema, model } = require('mongoose');

const Lesson = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  img: { type: String },
  author: [{ type: String, ref: 'User', required: true }],
});

module.exports = model('Lesson', Lesson);
