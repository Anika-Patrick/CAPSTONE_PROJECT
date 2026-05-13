const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  calories: Number,
  tokens: Number,
  weight: Number,
  height: Number,
  streak: { type: Number, default: 0 },
  rank: { type: String, default: 'Beginner' },
  lastLoginDate: { type: String, default: '' },
  activeDays: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);