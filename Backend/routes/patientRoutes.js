// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const { registerPatient, authPatient, bookAppointment, submitFeedback } = require('../controllers/patientController');

router.route('/signup').post(registerPatient);
router.route('/login').post(authPatient);
router.route('/bookAppointment').post(bookAppointment); 
router.route('/feedback').post(submitFeedback); 


module.exports = router;
