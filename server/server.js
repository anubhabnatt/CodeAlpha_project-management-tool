// Loads environment variables from a .env file into process.env
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5001;

// --- MIDDLEWARE ---
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Enable the Express app to parse JSON formatted request bodies
app.use(express.json());

// --- DATABASE CONNECTION ---
// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully."))
.catch(err => console.error("❌ MongoDB connection error:", err));

// --- BASIC ROUTE ---
// A simple route to check if the API is running
app.get('/', (req, res) => {
  res.send('Project Management Tool API is running!');
});

// --- START THE SERVER ---
// Make the app listen for incoming requests on the specified port
// --- API ROUTES ---
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});