const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const patientSchema = new mongoose.Schema({
  PID: { type: Number, unique: true },
  Name: { type: String, required: true }, 
  Age: { type: Number, required: true },
  Mono: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now }
});




patientSchema.pre('save', async function(next) {
  const doc = this;

  // Auto-increment PID
  if (doc.isNew) {
    try {
      const lastPatient = await mongoose.model('Patient').findOne({}, {}, { sort: { 'PID': -1 } });
      doc.PID = lastPatient ? lastPatient.PID + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }

  // Encrypt password
  if (!doc.isModified('Password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    doc.Password = await bcrypt.hash(doc.Password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

patientSchema.methods.matchPassword = async function(enteredPassword) {
  
  return await bcrypt.compare(enteredPassword, this.Password);
};

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
