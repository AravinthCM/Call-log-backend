const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patient');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
