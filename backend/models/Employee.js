const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: [String],
  image: { type: String }, 
});

module.exports = mongoose.model('Employee', EmployeeSchema);
