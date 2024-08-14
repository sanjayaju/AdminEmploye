const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const cors = require('cors');
const path = require('path'); 

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
