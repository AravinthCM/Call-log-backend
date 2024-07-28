const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const MedicalRecord = require('../models/MedicalRecord');

router.post('/login', async (req, res) => {
    const { phoneNumber } = req.body;
    try {
        const patient = await Patient.findOne({ mobileNumber: phoneNumber });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        if (patient.diseaseType === 'Acute') {
            return res.status(200).json({ redirect: 'UserHomePage', patient });
        }
        const record = await MedicalRecord.findOne({ userId: patient._id });
        if (record) {
            return res.status(200).json({ redirect: 'UserHomePage', patient });
        } else {
            return res.status(200).json({ redirect: 'ChronicForm', patient });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/medicalrecords/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const medicalRecord = await MedicalRecord.findOne({ userId: patientId });
        if (medicalRecord) {
            res.json(medicalRecord);
        } else {
            res.status(404).json({ message: 'Medical record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/medical-record', async (req, res) => {
    try {
      const {
        userId,
        phoneNumber,
        name,
        dob,
        age,
        weight,
        height,
        occupation,
        country,
        state,
        city,
        complaint,
        symptoms,
        associatedDisease,
        allopathy,
        diseaseHistory,
        surgeryHistory,
        allergies,
        bodyType,
        clinicReferral
      } = req.body;
  
      const medicalRecord = new MedicalRecord({
        userId,
        phoneNumber,
        name,
        dob,
        age,
        weight,
        height,
        occupation,
        country,
        state,
        city,
        complaint,
        symptoms,
        associatedDisease,
        allopathy,
        diseaseHistory,
        surgeryHistory,
        allergies,
        bodyType,
        clinicReferral
      });
  
      await medicalRecord.save();
      res.status(201).json(medicalRecord);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update medical record status route
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { medicalRecords } = req.body;
      
      const patient = await Patient.findById(id);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      patient.medicalRecords = medicalRecords;
      await patient.save();
      
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = router;
