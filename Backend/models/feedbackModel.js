const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  DiseaseType: {
    type: String,
    enum: [
      'Gastroenterologist',
      'Psychiatrist',
      'Oncologist',
      'Pediatricians',
      'Cardiologist', 
      'Neurologist',
      'Dermatologist',
      'Endocrinologist',
      'Rheumatologist',
      'Other'
    ],
    required: true
  },
  Rating: {
    type: String,
    enum: ['1', '2', '3', '4', '5'],
    required: true
  },
  ShortDescription: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;