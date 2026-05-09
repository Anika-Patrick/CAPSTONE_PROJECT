const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const songs = [
  {
    id: 1,
    title: 'Believer',
    category: 'Workout',
    image: 'https://i.imgur.com/XZ3nR.jpg',
    youtube: 'https://www.youtube.com/watch?v=7wtfhZwyrcc'
  },

  {
    id: 2,
    title: 'Eye Of The Tiger',
    category: 'Cardio',
    image: 'https://i.imgur.com/8Km9tLL.jpg',
    youtube: 'https://www.youtube.com/watch?v=tAGnKpE4NCI'
  },

  {
    id: 3,
    title: 'Stronger',
    category: 'Gym',
    image: 'https://i.imgur.com/8Km9tLL.jpg',
    youtube: 'https://www.youtube.com/watch?v=PsO6ZnUZI0g'
  }
];

app.get('/songs', (req, res) => {
  res.json(songs);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});