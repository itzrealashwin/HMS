// // const mongoose = require('mongoose');

// // // Define the appointment schema
// // const appointmentSchema = new mongoose.Schema({
// //   AppID: { type: Number, default : 0  , unique: true },
// //   Description: { type: String, required: true },
// //   Disease: { type: String, required: true },
// //   DoctID: { type: Number },
// //   Time: { type: String },
// //   Status: { type: String, default : "Waiting" },
// //   Preference: { type: String, required: true },
// //   Date: { type: String, required: true } // Use date format like '12-01-2001'
// // }); 

// // // Pre-save hook to auto-increment AppID
// // appointmentSchema.pre('save', async function(next) {
// //   const doc = this;

// //   if (doc.isNew) {
// //     try {
// //       // Find the latest AppID in any patient history
// //       const lastAppointment = await mongoose.model('PatientHistory').aggregate([
// //         { $unwind: "$Appointments" },
// //         { $sort: { "Appointments.AppID": -1 } },
// //         { $limit: 1 }
// //       ]);
// //       const lastAppID = lastAppointment.length > 0 ? lastAppointment[0].Appointments.AppID : 1000;
// //       doc.AppID = lastAppID + 1;
// //     } catch (error) {
// //       return next(error);
// //     }
// //   }
// //   next();
// // });

// // // Define the patient history schema
// // const patientHistorySchema = new mongoose.Schema({
// //     PID: { type: Number, required: true, unique: true },
// //     Appointments: { type: [appointmentSchema], required: true }
// //   });

// // // Create the model from the schema
// // const PatientHistory = mongoose.model('PatientHistory', patientHistorySchema);

// // module.exports = PatientHistory;



// const mongoose = require('mongoose');

// // Define the appointment schema
// const appointmentSchema = new mongoose.Schema({
//   AppID: { type: Number, default: 0, unique: true },
//   Description: { type: String, required: true },
//   Disease: { type: String, required: true },
//   DoctID: { type: Number },
//   Time: { type: String },
//   Status: { type: String, default: "Waiting" },
//   Preference: { type: String, required: true },
//   Date: { type: String, required: true } // Use date format like '2024-08-15'
// });

// // Pre-save hook to auto-increment AppID
// appointmentSchema.pre('save', async function(next) {
//   const doc = this;

//   if (doc.isNew) {
//     try {
//       // Find the latest AppID in any patient history
//       const lastAppointment = await mongoose.model('PatientHistory').aggregate([
//         { $unwind: "$Appointments" },
//         { $sort: { "Appointments.AppID": -1 } },
//         { $limit: 1 }
//       ]);
//       const lastAppID = lastAppointment.length > 0 ? lastAppointment[0].Appointments.AppID : 1000;
//       doc.AppID = lastAppID + 1;
//     } catch (error) {
//       return next(error);
//     }
//   }
//   next();
// });

// // Define the patient history schema
// const patientHistorySchema = new mongoose.Schema({
//   PID: { type: Number, required: true, unique: true },
//   Appointments: { type: [appointmentSchema], required: true }
// });

// // Method to clean up invalid or empty appointments
// patientHistorySchema.methods.cleanupAppointments = function() {
//   this.Appointments = this.Appointments.filter(appointment => {
//     return appointment.Description && appointment.Disease && appointment.Date;
//   });
// };

// // Pre-save hook to call cleanup method
// patientHistorySchema.pre('save', function(next) {
//   this.cleanupAppointments();
//   next();
// });

// // Create the model from the schema
// const PatientHistory = mongoose.model('PatientHistory', patientHistorySchema);

// module.exports = PatientHistory;



const mongoose = require('mongoose');

// Define the appointment schema
const appointmentSchema = new mongoose.Schema({
  AppID: { type: Number, default: 0, unique: true },
  Description: { type: String, required: true },
  Disease: { type: String, required: true },
  DoctID: { type: Number },
  Time: { type: String },
  Status: { type: String, default: "Waiting" },
  Preference: { type: String, required: true },
  Date: { type: String, required: true } // Use date format like '2024-08-15'
});

// Pre-save hook to auto-increment AppID
appointmentSchema.pre('save', async function(next) {
  const doc = this;

  if (doc.isNew) {
    try {
      // Find the latest AppID in any patient history
      const lastAppointment = await mongoose.model('PatientHistory').aggregate([
        { $unwind: "$Appointments" },
        { $sort: { "Appointments.AppID": -1 } },
        { $limit: 1 }
      ]);
      const lastAppID = lastAppointment.length > 0 ? lastAppointment[0].Appointments.AppID : 1000;
      doc.AppID = lastAppID + 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Define the patient history schema
const patientHistorySchema = new mongoose.Schema({
  PID: { type: Number, required: true, unique: true },
  Appointments: { type: [appointmentSchema], required: true, default: [] }
});

// Method to clean up invalid or empty appointments
patientHistorySchema.methods.cleanupAppointments = function() {
  // Remove appointments that are missing required fields
  this.Appointments = this.Appointments.filter(appointment => {
    return appointment.Description && appointment.Disease && appointment.Date;
  });

  // Remove the Appointments array if empty
  if (this.Appointments.length === 0) {
    this.Appointments = [];
  }
};

// Pre-save hook to call cleanup method
patientHistorySchema.pre('save', function(next) {
  this.cleanupAppointments();
  next();
});

// Create the model from the schema
const PatientHistory = mongoose.model('PatientHistory', patientHistorySchema);

module.exports = PatientHistory;




 