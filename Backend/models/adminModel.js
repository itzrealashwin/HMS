const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  Aid: { type: Number, unique: true },
  Name: { type: String, required: true },
  Age: { type: Number, required: true },
  Mono: { type: Number, required: true },
  Email: { type: String, required: true, unique: true },
  Gender: { type: String, required: true },
  Password: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now }
});

adminSchema.pre('save', async function(next) {
  const doc = this;
  if (doc.isNew) {
    try {
      const lastAdmin = await mongoose.model('Admin').findOne({}, {}, { sort: { 'Aid': -1 } });
      doc.Aid = lastAdmin ? lastAdmin.Aid + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();

  // ============================================

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



adminSchema.methods.matchPassword = async function(enteredPassword) {
return await bcrypt.compare(enteredPassword, this.Password);
};



// ====================================================
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
