const express = require('express');
const router = express.Router();
const User = require('../models/User');

// SAVE USER
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USERS
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE USER STREAK AND RANK
router.put('/:username/streak', async (req, res) => {
  try {
    const { username } = req.params;
    const { streak, rank, lastLoginDate, activeDays } = req.body;

    const user = await User.findOneAndUpdate(
      { username },
      { streak, rank, lastLoginDate, activeDays, lastUpdated: new Date() },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER BY USERNAME
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;