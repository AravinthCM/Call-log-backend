const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const patientTableRoutes = require('./routes/patientTable');  // Rename to be consistent
const dashboardRoutes = require('./routes/dashboard');
const patientTable = require('./routes/patientTable');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
//app.use('/api/patients', patientTable);  // Update the route to match the frontend request
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/patients', patientTableRoutes);


app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
