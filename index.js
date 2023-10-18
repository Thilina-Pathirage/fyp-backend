const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require('./routes/complaintsRoutes');
const leavesRoutes = require('./routes/leavesRoutes');
const cors = require("cors");

const app = express();
const port = process.env.PORT;

//access to cors
app.use(cors());

// Connect to MongoDB (replace 'your-database-uri' with your MongoDB URI)
mongoose.connect('mongodb+srv://thilinapathirage:w5u2ieXzh49R0AwB@cluster0.oe1cihe.mongodb.net/fypDB?retryWrites=true&w=majority', {
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
app.use('/api/leaves', leavesRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});
