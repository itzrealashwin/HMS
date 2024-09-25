const mongoose = require('mongoose');

// Define the doctor schema
const doctorSchema = new mongoose.Schema({
  DID: { type: Number, unique: true },
  Name: { type: String, required: true },
  Gender: { type: String, required: true },
  Age: { type: Number, required: true },
  Mono: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Specialist:{
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
  Degrees: { type: [String], required: true },
  CreatedAt: { type: Date, default: Date.now }
});

// Pre-save hook to auto-increment DID
doctorSchema.pre('save', async function(next) {
  const doc = this;

  if (doc.isNew) {
    try {
      // Find the highest DID in the collection
      const lastDoctor = await mongoose.model('Doctor').findOne({}, {}, { sort: { 'DID': -1 } });
      doc.DID = lastDoctor ? lastDoctor.DID + 1 : 101;
    } catch (error) {
      return next(error);
    }
  }

  next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
