const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ================= CHAT API =================
app.post('/chat', (req, res) => {
  const q = req.body.question.toLowerCase();

  let response = '';

  // ================= NON VEG =================
  if (
    q.includes('non veg') ||
    q.includes('chicken') ||
    q.includes('egg') ||
    q.includes('fish')
  ) {
    response = `🍗 NON-VEG HIGH PROTEIN DIET

Breakfast: Eggs + Milk + Banana
Lunch: Chicken + Rice + Salad
Dinner: Fish / Chicken + Veggies

💪 Best for muscle gain & strength`;
  }

  // ================= VEG =================
  else if (
    q.includes('veg') ||
    q.includes('paneer') ||
    q.includes('tofu') ||
    q.includes('vegetarian')
  ) {
    response = `🥦 VEG HIGH PROTEIN DIET

Breakfast: Oats + Milk + Banana
Lunch: Rice + Dal + Paneer
Dinner: Roti + Sabzi + Curd

💪 Best for fat loss & fitness`;
  }

  // ================= WORKOUT =================
  else if (
    q.includes('workout') ||
    q.includes('gym') ||
    q.includes('exercise')
  ) {
    response = `🏋️ WEEKLY WORKOUT PLAN

Monday: Chest
Tuesday: Back
Wednesday: Legs
Thursday: Shoulders
Friday: Arms
Saturday: Abs + Cardio
Sunday: Rest`;
  }

  // ================= CALORIES =================
  else if (q.includes('calorie')) {
    response = `🔥 CALORIES GUIDE

Rice: 200 cal
Roti: 100 cal
Banana: 90 cal
Milk: 150 cal
Egg: 70 cal
Burger: 350+ cal`;
  }

  // ================= MOTIVATION =================
  else if (q.includes('motivation')) {
    response = `🚀 MOTIVATION

Discipline > Motivation
Consistency wins everything
Never skip twice 💪`;
  }

  // ================= DEFAULT =================
  else {
    response = `🤖 I can help you with:

• Diet Plans
• Workout Plans
• Calories
• Motivation

Try asking something like:
"veg diet plan" or "workout for chest"`;
  }

  res.json({ answer: response });
});

// ================= START SERVER =================
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});