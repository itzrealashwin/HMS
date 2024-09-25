// controllers/patientController.js
const asyncHandler = require('express-async-handler');
const Patient = require('../models/patientModel');
const PatientHistory = require('../models/patientHistoryModel'); // Import your PatientHistory model
const Feedback = require('../models/feedbackModel');
const generateToken = require('../config/generateToken');

// @desc    Register a new patient
// @route   POST /signup
// @access  Public
const registerPatient = asyncHandler(async (req, res) => {
  const { Name, Age, Mono, Email, Password } = req.body;
    console.log(req.body);
    
  if (!Name || !Age || !Mono || !Email || !Password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  const patientExists = await Patient.findOne({ Email });

  if (patientExists) {
    res.status(400);
    throw new Error('Patient already exists');
  }

  const patient = await Patient.create({
    Name,
    Age,
    Mono,
    Email,
    Password,
  });

  if (patient) {
    res.status(201).json({
      _id: patient._id,
      Name: patient.Name,
      Age: patient.Age,
      Mono: patient.Mono,
      Email: patient.Email,
      token: generateToken(patient._id),
      PID : patient.PID,
      Password : Password
    });
  } else {
    res.status(400);
    throw new Error('Failed to create the patient');
  }
});


// @desc    Auth patient & get token
// @route   POST /login
// @access  Public
const authPatient = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;
console.log(req.body);

  const patient = await Patient.findOne({ Email });

  if (patient && (await patient.matchPassword(Password))) {
    res.json({
      _id: patient._id,
      Name: patient.Name,
      Age: patient.Age,
      Mono: patient.Mono,
      Email: patient.Email,
      token: generateToken(patient._id),
      pid : patient.PID,
      Password : Password
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Book an appointment
// @route   POST /book-appointment
// @access  Private
const bookAppointment = asyncHandler(async (req, res) => {
  const { PID, Description, Disease, Preference, Date } = req.body;

console.log(req.body);


  if (!PID || !Description || !Disease || !Preference || !Date) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Check if patient history exists for the given PID
  let patientHistory = await PatientHistory.findOne({ PID });

  if (!patientHistory) {
    // Create new patient history if it doesn't exist
    patientHistory = await PatientHistory.create({
      PID,
      Appointments: []
    });
  }

  // Create a new appointment
  const newAppointment = {
    Description,
    Disease,
    Preference,
    Date
  };

  // Add the new appointment to the patient history
  patientHistory.Appointments.push(newAppointment);

  // Save the updated patient history
  await patientHistory.save();

  res.status(201).json({
    message: 'Appointment booked successfully',
    appointment: newAppointment
  });
});


// @desc    Submit feedback
// @route   POST /feedback
// @access  Public
const submitFeedback = asyncHandler(async (req, res) => {
  const { Name, Email, DiseaseType, Rating, ShortDescription } = req.body;

  if (!Name || !Email || !DiseaseType || !Rating || !ShortDescription) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  try {
    const feedback = await Feedback.create({
      Name,
      Email,
      DiseaseType,
      Rating,
      ShortDescription
    });

    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      res.status(400).json({
        message: 'Invalid data provided',
        errors: messages
      });
    } else {
      res.status(500).json({
        message: 'Server error',
        error: error.message
      });
    }
  }
});

module.exports = { registerPatient, authPatient, bookAppointment, submitFeedback };