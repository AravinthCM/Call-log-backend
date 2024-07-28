const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    consultingFor: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    whatsappNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    consultingReason: {
        type: String,
        required: true
    },
    diseaseType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    medicalRecords: {
        type: String,
        default: "pending"
    },
    callFromApp: {
        type: String,
        default: 'pending'
    }
});

module.exports = mongoose.model('Patient', patientSchema);
