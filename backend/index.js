// Importing Express framework
const express = require('express');
// Creating an Express application instance
const app = express();
// Port number for the server to listen on
const port = 5000;

// Importing MongoDB connection function
const mongoDB = require('./db');

// Connect to MongoDB
mongoDB().catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware to parse JSON bodies
app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
  // Set allowed origin for CORS
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API routes
// Route for creating a new user
app.use('/api', require('./Routes/CreateUser'));
// Route for displaying data
app.use('/api', require('./Routes/DisplayData'));

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
