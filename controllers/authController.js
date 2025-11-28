const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
// @route   POST /auth/signup
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create User
    const user = await User.create({ email, password });

    // 3. Send Response (Frontend expects { id, role, token })
    if (user) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find User
    const user = await User.findOne({ email });

    // 2. Check Password
    if (user && (await user.checkPassword(password))) {
      res.json({
        id: user.id,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};