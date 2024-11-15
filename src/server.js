// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');  // For serving the HTML page
const serviceRoutes = require('./routes/serviceRoutes');  // Assuming this is where the routes are

const app = express();

// Port and MongoDB URI from environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Check if MONGO_URI is defined
if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in the .env file!');
  process.exit(1);
}

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files like images, CSS, JS, and HTML
app.use(express.static(path.join(__dirname, 'public'))); 

// Route to serve the HTML form to add a service
app.get('/add-service', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'addService.html')); // Serve the HTML page
});

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// Use the serviceRoutes for API endpoints
app.use('/api', serviceRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Healthcare API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
