const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    phoneNumber: { type: Number, required: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    occupation: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    complaint: { type: String, required: true },
    symptoms: { type: String, required: true },
    associatedDisease: { type: String, required: true },
    allopathy: { type: String, required: true },
    diseaseHistory: { type: String, required: true },
    surgeryHistory: { type: String, required: true },
    allergies: { type: String, required: true },
    bodyType: { type: String, required: true },
    clinicReferral: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
