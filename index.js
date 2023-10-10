const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require('./routes/complaintsRoutes');

const app = express();
const port = process.env.PORT;

// Connect to MongoDB (replace 'your-database-uri' with your MongoDB URI)
mongoose.connect('mongodb+srv://' + process.env.URI, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
