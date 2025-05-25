const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pg', require('./routes/pg'));
app.use('/api/rooms', require('./routes/rooms'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PGatEase API' });
});

// Test database connection
db.query('SELECT 1')
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});