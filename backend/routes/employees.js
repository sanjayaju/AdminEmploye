const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Employee = require('../models/Employee');

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST endpoint to create an employee
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobileNo, designation, gender, course } = req.body;
    const image = req.file ? req.file.path : null;

    // Validate required fields
    if (!name || !email || !mobileNo || !designation || !gender) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new employee
    const newEmployee = new Employee({
      name,
      email,
      mobileNo,
      designation,
      gender,
      course: JSON.parse(course),
      image
    });

    const savedEmployee = await newEmployee.save();
    res.json(savedEmployee);
  } catch (err) {
    console.error('Error creating employee:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.get('/', async (req, res) => {
    try {
      const employees = await Employee.find();
      res.json(employees); // Send an empty array if no employees found
    } catch (err) {
      console.error('Error fetching employees:', err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports = router;
