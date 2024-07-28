const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

router.get('/', async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    console.log('Start of day:', startOfDay);
    console.log('End of day:', endOfDay);

    const totalPatients = await Patient.countDocuments();
    const chronicPatients = await Patient.countDocuments({ diseaseType: 'Chronic' });
    const acutePatients = await Patient.countDocuments({ diseaseType: 'Acute' });

    console.log('Query for new patients:', {
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    const newPatientsToday = await Patient.countDocuments({
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    console.log('New patients query result:', newPatientsToday);

    const pendingCallsFromApp = await Patient.countDocuments({ callFromApp: 'pending' });
    const pendingMedicalRecords = await Patient.countDocuments({ medicalRecords: 'pending' });

    // Log sample patients for debugging
    const samplePatients = await Patient.find().limit(5);
    console.log('Sample patients:', samplePatients);

    const todaysPatients = await Patient.find({
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    }).limit(5);
    console.log('Sample of today\'s patients:', todaysPatients);

    res.json({
      totalPatients,
      chronicPatients,
      acutePatients,
      newPatientsToday,
      pendingCallsFromApp,
      pendingMedicalRecords
    });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.toString() });
  }
});

module.exports = router;