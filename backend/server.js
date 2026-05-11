require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

// ================= TEST ROUTE =================
app.get('/', (req, res) => {
  res.send('🔥 Fitness Backend Running');
});

// ================= MONGODB CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');

    // Start server only after DB connects
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.log('❌ MongoDB Error:', err);
  });