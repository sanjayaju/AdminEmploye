const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/employeadmin', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Hash admin password and create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('sanju@123', salt);

    const admin = await User.findOne({ username: 'sanju' });
    if (!admin) {
      const newAdmin = new User({
        username: 'sanju',
        password: hashedPassword,
      });
      await newAdmin.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;

