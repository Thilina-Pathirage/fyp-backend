// UserController.js

const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

module.exports = { registerUser, loginUser };
