const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @route POST /api/auth
// @desc Authenticate user
router.post('/', async (req, res) => { // Handles POST request to /api/auth
    const { username, password } = req.body;
  
  
    console.log('Request received:', req.body); // Log request data
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        console.log('User not found');
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        console.log('Password mismatch');
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      console.log('Authentication successful');
      return res.json({ message: 'Authentication successful' });
    } catch (err) {
      console.error('Server error:', err.message);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
