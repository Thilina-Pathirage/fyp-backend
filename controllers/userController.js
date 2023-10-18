// UserController.js

const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');






dotenv.config();


// User Registration
async function registerUser(req, res) {
  try {
    const { firstName, lastName, email, password, userRole, position, mentalHealthStatus, workStatus } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userRole,
      position,
      mentalHealthStatus,
      workStatus,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        userRole: newUser.userRole,
      },
      process.env.SECRET,
      { expiresIn: '1h' }
    );

    // Return the token along with user details
    res.status(201).json({ token });
    // res.status(201).json({ token, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email, userRole: newUser.userRole });

  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
}

// User Login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userRole: user.userRole,
      },
      process.env.SECRET,
      { expiresIn: '1h' }
    );

    // Return the token along with user details
    res.status(200).json({ token });
    // res.status(200).json({ token, firstName: user.firstName, lastName: user.lastName, email: user.email, userRole: user.userRole });

  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
}

const WorkRecord = require('../models/workRecordModel'); // Import the WorkRecord model

// Start work time tracking
async function startWorkTime(req, res) {
  try {
    const { userId } = req.body;
    const currentTime = new Date();
    const currentDate = new Date().toLocaleDateString();

    // Check if there is an existing work record for the current date
    const existingRecord = await WorkRecord.findOne({ userId, date: currentDate });

    if (existingRecord) {
      return res.status(200).json({ message: 'Work time tracking already started for today.' });
    }

    // Store the start time in a new user's work record
    const workRecord = new WorkRecord({
      userId,
      date: currentDate,
      startTime: currentTime,
      endTime: null, // Initially, the end time is null
    });

    await workRecord.save();
    res.status(200).json({ message: 'Work time tracking started for today.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to start work time tracking', error: error.message });
  }
}

module.exports = { startWorkTime };


// Stop work time tracking and update work record
async function stopWorkTime(req, res) {
  try {
    const { userId } = req.body;
    const stopTime = new Date();

    // Find the work record for the current date
    const currentDate = new Date().toLocaleDateString();
    const workRecord = await WorkRecord.findOne({ userId, date: currentDate, endTime: null });

    if (workRecord) {
      // Update the end time and calculate work duration
      workRecord.endTime = stopTime;
      const workDuration = workRecord.endTime - workRecord.startTime;

      // Update the work record
      await workRecord.save();

      res.status(200).json({ message: 'Work time tracking stopped.', workDuration });
    } else {
      res.status(404).json({ message: 'Work time tracking not started for today.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to stop work time tracking', error: error.message });
  }
}

module.exports = { registerUser, loginUser, startWorkTime, stopWorkTime };
