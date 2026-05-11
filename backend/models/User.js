const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  calories: Number,
  tokens: Number,
  weight: Number,
  height: Number
});

module.exports = mongoose.model('User', UserSchema);