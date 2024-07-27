const mongoose = require('mongoose');

const AssistantDoctorSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'assistantDoctor' }
});

module.exports = mongoose.model('AssistantDoctor', AssistantDoctorSchema);
