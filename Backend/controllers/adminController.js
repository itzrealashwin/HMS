// controllers/adminController.js
const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");
const Admin = require("../models/adminModel");
const Feedback = require("../models/feedbackModel");
const PatientHistory = require("../models/patientHistoryModel");
const Doctor = require("../models/doctorModel");
const moment = require("moment");
const generateToken = require("../config/generateToken");

// @desc    Add a new admin
// @route   POST /admin/admins
// @access  Public
const addAdmin = asyncHandler(async (req, res) => {
  const { Name, Age, Mono, Email, Gender, Password } = req.body;
  console.log(req.body);

  if (!Name || !Age || !Mono || !Email || !Gender || !Password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const adminExists = await Admin.findOne({ Email });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const admin = new Admin({
    Name,
    Age,
    Mono,
    Email,
    Gender,
    Password,
  });

  try {
    await admin.save();
    res.status(201).json({
      message: "Admin added successfully",
      admin: {
        Aid: admin.Aid,
        Name: admin.Name,
        Age: admin.Age,
        Mono: admin.Mono,
        Email: admin.Email,
        token: generateToken(admin._id),
        Gender: admin.Gender,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add admin",
      error: error.message,
    });
  }
});

// @desc    Login admin
// @route   POST /admin/login
// @access  Public
// const loginAdmin = asyncHandler(async (req, res) => {
//   const { Email, Password } = req.body;
//   console.log(req.body);

//   if (!Email || !Password) {
//     res.status(400);
//     throw new Error('Please enter both email and password');
//   }

//   const admin = await Admin.findOne({ Email });

//   if (admin && admin.Password === Password) {
//     res.json({
//       message: 'Login successful',
//       admin: {
//         Aid: admin.Aid,
//         Name: admin.Name,
//         Age: admin.Age,
//         Mono: admin.Mono,
//         Email: admin.Email,
//         Gender: admin.Gender
//       }
//     }).status(200);
//   } else {
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
// });

// ==============================================

const loginAdmin = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;
  console.log(req.body);

  if (!Email || !Password) {
    res.status(400);
    throw new Error("Please enter both email and password");
  }

  const admin = await Admin.findOne({ Email });
  console.log(admin);

  if (admin && admin.Password === Password) {
    res
      .json({
        message: "Login successful",
        admin: {
          Aid: admin.Aid,
          Name: admin.Name,
          Age: admin.Age,
          Mono: admin.Mono,
          Email: admin.Email,
          token: generateToken(admin._id),
          Gender: admin.Gender,
        },
      })
      .status(200);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
// =============================================

// @desc    Fetch all feedbacks
// @route   GET /admin/feedbacks
// @access  Public
const getAllFeedback = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find({});

  const formattedFeedbacks = feedbacks.map((fb) => ({
    name: fb.Name,
    rating: fb.Rating,
    date: new Date(fb.CreatedAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    description: fb.ShortDescription,
  }));

  res.json(formattedFeedbacks);
});

// @desc    Update an appointment
// @route   PUT /admin/appointments/:appointmentId
// @access  Public
const updateAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { status, timeSlot, doctorId } = req.body;

  if (!["slot1", "slot2"].includes(timeSlot)) {
    res.status(400);
    throw new Error("Invalid time slot");
  }

  const patientHistory = await PatientHistory.findOne({
    "Appointments.AppID": appointmentId,
  });

  if (!patientHistory) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  const appointment = patientHistory.Appointments.find(
    (app) => app.AppID === parseInt(appointmentId)
  );

  if (appointment) {
    appointment.Status = status || appointment.Status;
    appointment.Time = timeSlot || appointment.Time;
    appointment.DoctID = doctorId || appointment.DoctID;

    await patientHistory.save();

    res.json({ message: "Appointment updated successfully" }).status(200);
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

// @desc    Add a new doctor
// @route   POST /admin/doctors
// @access  Public
const addDoctor = asyncHandler(async (req, res) => {
  const { Name, Gender, Age, Mono, Email, Specialist, Degrees } = req.body;

  if (!Name || !Gender || !Age || !Mono || !Email || !Specialist || !Degrees) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  try {
    const doctor = await Doctor.create({
      Name,
      Gender,
      Age,
      Mono,
      Email,
      Specialist,
      Degrees,
    });

    res.status(201).json({
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add doctor",
      error: error.message,
    });
  }
});

// @desc    Get all doctors' details
// @route   GET /admin/doctors
// @access  Public
const getAllDoctors = asyncHandler(async (req, res) => {
  try {
    const doctors = await Doctor.find(
      {},
      "DID Name Specialist Degrees Gender Age Mono Email"
    );

    if (!doctors.length) {
      res.status(404);
      throw new Error("No doctors found");
    }

    res.json(doctors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch doctors details",
      error: error.message,
    });
  }
});

// @desc    Get all appointments with patient name, disease, doctor name, and status
// @route   GET /admin/appointments
// @access  Public
// CODE WRITTEN BY JAYESH
// const getAllAppointments = asyncHandler(async (req, res) => {
//   try {
//       const patientHistories = await PatientHistory.find();
//       const appointments = [];

//       for (const history of patientHistories) {
//           const patient = await Patient.findOne({ PID: history.PID });
//           for (const appointment of history.Appointments) {
//               const doctor = await Doctor.findOne({ DID: appointment.DoctID });
//               appointments.push({
//                   Status: appointment.Status,
//                   PatientName: patient ? patient.Name : 'Unknown',
//                   Disease: appointment.Disease,
//                   DoctorName: doctor ? doctor.Name : 'Unknown'
//               });
//           }
//       }

//       res.json(appointments);
//   } catch (error) {
//       res.status(500).json({
//           message: 'Failed to fetch appointments',
//           error: error.message
//       });
//   }
// });

// CODE OPTIMIZED BY GPT LEVEL 1

// const getAllAppointments = asyncHandler(async (req, res) => {
//   try {
//     // Fetch all patient histories with necessary fields
//     const patientHistories = await PatientHistory.find({}, { PID: 1, Appointments: 1 });
//     const pids = patientHistories.map(history => history.PID);

//     // Fetch all patients in one go
//     const patients = await Patient.find({ PID: { $in: pids } }, { PID: 1, Name: 1 });
//     const patientMap = new Map(patients.map(patient => [patient.PID, patient.Name]));

//     // Collect all doctor IDs from appointments
//     const doctorIds = new Set();
//     patientHistories.forEach(history => {
//       history.Appointments.forEach(appointment => {
//         doctorIds.add(appointment.DoctID);
//       });
//     });

//     // Fetch all doctors in one go
//     const doctors = await Doctor.find({ DID: { $in: Array.from(doctorIds) } }, { DID: 1, Name: 1 });
//     const doctorMap = new Map(doctors.map(doctor => [doctor.DID, doctor.Name]));

//     // Construct appointments array
//     const appointments = [];
//     for (const history of patientHistories) {
//       for (const appointment of history.Appointments) {
//         appointments.push({
//           Status: appointment.Status,
//           PatientName: patientMap.get(history.PID) || 'Unknown',
//           Disease: appointment.Disease,
//           DoctorName: doctorMap.get(appointment.DoctID) || 'Unknown',
//         });
//       }
//     }

//     res.json(appointments);
//   } catch (error) {
//     res.status(500).json({
//       message: 'Failed to fetch appointments',
//       error: error.message,
//     });
//   }
// });

const getAllAppointments = asyncHandler(async (req, res) => {
  try {
    // Aggregation pipeline to fetch appointments with patient and doctor details
    const appointments = await PatientHistory.aggregate([
      { $unwind: "$Appointments" },
      {
        $lookup: {
          from: "patients", // Name of the Patient collection
          localField: "PID",
          foreignField: "PID",
          as: "patient",
        },
      },
      { $unwind: { path: "$patient", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "doctors", // Name of the Doctor collection
          localField: "Appointments.DoctID",
          foreignField: "DID",
          as: "doctor",
        },
      },
      { $unwind: { path: "$doctor", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          AID: "$Appointments.AppID",
          Status: "$Appointments.Status",
          PatientName: { $ifNull: ["$patient.Name", "Unknown"] },
          Disease: "$Appointments.Disease",
          DoctorName: { $ifNull: ["$doctor.Name", false] },
          TimeSlot: "$Appointments.Time",
          Description: "$Appointments.Description",
          Date: "$Appointments.Date",
          DoctID: "$Appointments.DoctID",
        },
      },
    ]);

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
});

// @desc    Delete an appointment
// @route   DELETE /admin/deleteAppointment/:appointmentId
// @access  Public
// const deleteAppointment = asyncHandler(async (req, res) => {
//   const { appointmentId } = req.params;
//   console.log(appointmentId);

//   try {
//     const patientHistory = await PatientHistory.findOne({
//       Appointments: {
//         $elemMatch: {
//           $or: [
//             { AppID: appointmentId },
//             { AppID: { $exists: false } }
//           ]
//         }
//       }
//     });

//     if (!patientHistory) {
//       res.status(404);
//       throw new Error("Appointment not found");
//     }

//     const appointmentIndex = patientHistory.Appointments.findIndex(
//       (app) => app.AppID === parseInt(appointmentId)
//     );

//     if (appointmentIndex !== -1) {
//       patientHistory.Appointments.splice(appointmentIndex, 1);
//       await patientHistory.save();
//       res.json({ message: "Appointment deleted successfully" });
//     } else {
//       res.status(404);
//       throw new Error("Appointment not found");
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to delete appointment",
//       error: error.message,
//     });
//   }
// });

// async function deleteAppointment(appointmentId) {
//   // try {
//   //   const result = await PatientHistory.updateMany(
//   //     { "Appointments.AppID": appointmentId },
//   //     { $pull: { Appointments: { AppID: appointmentId } } }
//   //   );

//   //   if (result.nModified === 0) {
//   //     console.log("No appointment found to delete.");
//   //   } else {
//   //     console.log("Appointment deleted successfully.");
//   //   }
//   // } catch (error) {
//   //   if (error.code === 11000) {
//   //     console.error("Duplicate key error:", error.message);
//   //   } else {
//   //     console.error("Failed to delete appointment:", error.message);
//   //   }
//   // }
//   try {
//     // Find and update the PatientHistory document
//     const result = await PatientHistory.updateMany(
//       { "Appointments.AppID": parseInt(appId, 10) },
//       { $pull: { Appointments: { AppID: parseInt(appId, 10) } } }
//     );

//     // Check if any documents were modified
//     if (result.nModified === 0) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }

//     // Optionally, remove the Appointments array if empty
//     // (you can uncomment this if needed)
//     // const updatedPatientHistory = await PatientHistory.findOne({ "Appointments.AppID": parseInt(appId, 10) });
//     // if (updatedPatientHistory && updatedPatientHistory.Appointments.length === 0) {
//     //   await PatientHistory.updateOne({ PID: updatedPatientHistory.PID }, { $set: { Appointments: [] } });
//     // }

//     res.status(200).json({ message: 'Appointment deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting appointment:', error);
//     res.status(500).json({ message: 'Failed to delete appointment', error: error.message });
//   }
// }
const deleteAppointment = asyncHandler(async (req, res) => {
  try {
    const { appointmentId } = req.params; // Extract appointmentId from request params

    // Ensure appointmentId is an integer
    const appId = parseInt(appointmentId, 10);

    // Find and update the PatientHistory document
    const result = await PatientHistory.updateMany(
      { "Appointments.AppID": appId },
      { $pull: { Appointments: { AppID: appId } } }
    );

    // Check if any documents were modified
    if (result.nModified === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Optionally, remove the Appointments array if empty
    const updatedPatientHistory = await PatientHistory.findOne({
      "Appointments.AppID": appId,
    });
    if (
      updatedPatientHistory &&
      updatedPatientHistory.Appointments.length === 0
    ) {
      await PatientHistory.updateOne(
        { PID: updatedPatientHistory.PID },
        { $set: { Appointments: [] } }
      );
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res
      .status(500)
      .json({ message: "Failed to delete appointment", error: error.message });
  }
});

// @desc    Update doctor information
// @route   PUT /admin/updateDoctor/:did
// @access  Public
const updateDoctor = asyncHandler(async (req, res) => {
  const { did } = req.params;
  const { Name, Gender, Age, Mono, Email, Specialist, Degrees } = req.body;

  try {
    const doctor = await Doctor.findOne({ DID: did });

    if (!doctor) {
      res.status(404);
      throw new Error("Doctor not found");
    }

    // Update the doctor information, excluding DID
    if (Name) doctor.Name = Name;
    if (Gender) doctor.Gender = Gender;
    if (Age) doctor.Age = Age;
    if (Mono) doctor.Mono = Mono;
    if (Email) doctor.Email = Email;
    if (Specialist) doctor.Specialist = Specialist;
    if (Degrees) doctor.Degrees = Degrees;

    await doctor.save();

    res.json({ message: "Doctor updated successfully", doctor });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update doctor",
      error: error.message,
    });
  }
});

// @desc    Delete a doctor
// @route   DELETE /admin/deleteDoctor/:did
// @access  Public
const deleteDoctor = asyncHandler(async (req, res) => {
  const { did } = req.params;

  try {
    const doctor = await Doctor.findOneAndDelete({ DID: did });

    if (!doctor) {
      res.status(404);
      throw new Error("Doctor not found");
    }

    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete doctor",
      error: error.message,
    });
  }
});

// @desc    Fetch all admins
// @route   GET /admin/admins
// @access  Public
const getAllAdmins = asyncHandler(async (req, res) => {
  try {
    const admins = await Admin.find({}, "Aid Name Age Mono Email Gender");

    if (!admins.length) {
      res.status(404);
      throw new Error("No admins found");
    }

    res.json(admins);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch admins",
      error: error.message,
    });
  }
});

// @desc    Update admin information
// @route   PUT /admin/admins/:adminId
// @access  Public
const updateAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  const { Name, Age, Mono, Email, Gender, Password } = req.body;

  try {
    // Find the admin by adminId
    const admin = await Admin.findOne({ Aid: adminId });

    if (!admin) {
      res.status(404);
      throw new Error("Admin not found");
    }

    // Update fields except Aid
    if (Name !== undefined) admin.Name = Name;
    if (Age !== undefined) admin.Age = Age;
    if (Mono !== undefined) admin.Mono = Mono;
    if (Email !== undefined) admin.Email = Email;
    if (Gender !== undefined) admin.Gender = Gender;

    // If password is provided, store it as plain text
    if (Password !== undefined) {
      admin.Password = Password; // Store password as plain text
    }

    // Save the updated admin
    await admin.save();

    res.json({
      message: "Admin updated successfully",
      admin: {
        Aid: admin.Aid,
        Name: admin.Name,
        Age: admin.Age,
        Mono: admin.Mono,
        Email: admin.Email,
        Gender: admin.Gender,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update admin",
      error: error.message,
    });
  }
});

// @desc    Delete an admin
// @route   DELETE /admin/admins/:adminId
// @access  Public
const deleteAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findOneAndDelete({ Aid: adminId });

    if (!admin) {
      res.status(404);
      throw new Error("Admin not found");
    }

    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete admin",
      error: error.message,
    });
  }
});

// @desc    Get counts of today's patients with "complete" or "confirm" status by disease type
// @route   GET /api/patients/status-counts
// @access  Public
const getStatusCounts = asyncHandler(async (req, res) => {
  const diseaseTypes = [
    "Gastroenterologist",
    "Psychiatrist",
    "Oncologist",
    "Pediatricians",
    "Cardiologist",
    "Neurologist",
    "Dermatologist",
    "Endocrinologist",
    "Rheumatologist",
    "Other",
  ];

  // Initialize the counts object
  const counts = diseaseTypes.reduce((acc, disease) => {
    acc[disease] = 0;
    return acc;
  }, {});

  // Get today's date in the required format
  const today = moment().format("YYYY-MM-DD");

  // Fetch all patient histories
  const patientHistories = await PatientHistory.find({});

  // Filter appointments with today's date and "complete" or "confirm" status, then count them by disease type
  patientHistories.forEach((history) => {
    history.Appointments.forEach((appointment) => {
      if (
        appointment.Date === today &&
        (appointment.Status === "Complete" || appointment.Status === "Confirm")
      ) {
        counts[appointment.Disease] = (counts[appointment.Disease] || 0) + 1;
      }
    });
  });

  res.json(counts);
});

// ===============================================================

//  =====================update by krunal=================

// @desc    Get counts of patients by date for the past week (Monday to Saturday)
// @route   GET /api/patients/weekly-counts
// @access  Public
const getWeeklyCountsByDate = asyncHandler(async (req, res) => {
  const { date } = req.body; // Expecting a date in "yyyy-mm-dd" format

  // Parse the provided date
  const givenDate = moment(date, "YYYY-MM-DD");
  if (!givenDate.isValid()) {
    return res
      .status(400)
      .json({ error: "Invalid date format. Please use 'yyyy-mm-dd'." });
  }

  const dayOfWeek = givenDate.isoWeekday(); // 1 (Monday) to 7 (Sunday)

  // Calculate the start date (Monday) and end date (Saturday) of the week containing the given date
  const startDate = givenDate
    .clone()
    .subtract(dayOfWeek - 1, "days")
    .startOf("day");
  const endDate = startDate.clone().add(5, "days").endOf("day"); // Covers Monday to Saturday

  // Calculate the week range label
  const thisWeekRange = `${moment(startDate).format("MMM DD")} - ${moment(endDate).format("MMM DD")}`;

  // Initialize the counts object with the week range included
  const counts = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    weekname: thisWeekRange, // Add the week range here
  };

  // Fetch all patient histories
  const patientHistories = await PatientHistory.find({});

  // Count appointments by date excluding "waiting" status
  patientHistories.forEach((history) => {
    history.Appointments.forEach((appointment) => {
      const appointmentDate = moment(appointment.Date, "YYYY-MM-DD").startOf("day");
      if (
        appointmentDate.isBetween(startDate, endDate, null, "[]") &&
        appointment.Status !== "waiting"
      ) {
        const dayName = appointmentDate.format("dddd").toLowerCase();
        counts[dayName]++;
      }
    });
  });

  // Return the counts object including the week range
  res.json(counts);
});


//  =====================update by krunal=================

const getWeeklyCounts = asyncHandler(async (req, res) => {
  const today = moment();
  const dayOfWeek = today.isoWeekday(); // 1 (Monday) to 7 (Sunday)

  // Calculate the start date for each week
  const thisWeekStartDate = today
    .clone()
    .subtract(dayOfWeek - 1, "days")
    .startOf("day");
  const previousWeekStartDate = thisWeekStartDate
    .clone()
    .subtract(7, "days")
    .startOf("day");
  const previousToPreviousWeekStartDate = previousWeekStartDate
    .clone()
    .subtract(7, "days")
    .startOf("day");

  // Calculate the end date for each week (Saturday)
  const thisWeekEndDate = thisWeekStartDate.clone().add(5, "days").endOf("day"); // Ends on Saturday
  const previousWeekEndDate = previousWeekStartDate
    .clone()
    .add(5, "days")
    .endOf("day");
  const previousToPreviousWeekEndDate = previousToPreviousWeekStartDate
    .clone()
    .add(5, "days")
    .endOf("day");

  // Generate week range labels with no spaces
  const thisWeekRange = `${moment(thisWeekStartDate).format("MMM DD")} - ${moment(thisWeekEndDate).format("MMM DD")}`;
  const previousWeekRange = `${moment(previousWeekStartDate).format("MMM DD")} - ${moment(previousWeekEndDate).format("MMM DD")}`;
  const previousToPreviousWeekRange = `${moment(previousToPreviousWeekStartDate).format("MMM DD")} - ${moment(previousToPreviousWeekEndDate).format("MMM DD")}`;

  // Initialize the counts objects with a weekname key
  const thisWeekCounts = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    weekname: thisWeekRange,
  };

  const previousWeekCounts = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    weekname: previousWeekRange,
  };

  const previousToPreviousWeekCounts = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    weekname: previousToPreviousWeekRange,
  };

  // Fetch all patient histories
  const patientHistories = await PatientHistory.find({});

  // Count appointments by date excluding "waiting" status and avoiding Sunday
  patientHistories.forEach((history) => {
    history.Appointments.forEach((appointment) => {
      const appointmentDate = moment(appointment.Date, "YYYY-MM-DD").startOf(
        "day"
      );
      const dayName = appointmentDate.format("dddd").toLowerCase();

      if (appointment.Status !== "waiting" && dayName !== "sunday") {
        if (
          appointmentDate.isBetween(
            thisWeekStartDate,
            thisWeekEndDate,
            null,
            "[]"
          )
        ) {
          thisWeekCounts[dayName]++;
        } else if (
          appointmentDate.isBetween(
            previousWeekStartDate,
            previousWeekEndDate,
            null,
            "[]"
          )
        ) {
          previousWeekCounts[dayName]++;
        } else if (
          appointmentDate.isBetween(
            previousToPreviousWeekStartDate,
            previousToPreviousWeekEndDate,
            null,
            "[]"
          )
        ) {
          previousToPreviousWeekCounts[dayName]++;
        }
      }
    });
  });

  // Send the counts for each week in the response with simplified labels
  const result = {
    CurrentWeek: thisWeekCounts,
    PreviousWeek: previousWeekCounts,
    PreviousToPreviousWeek: previousToPreviousWeekCounts,
  };

  res.json(result);
});

// =========================================================================

const getDoctorAvailability = asyncHandler(async (req, res) => {
  // Use moment to get the current date in "DD-MM-YYYY" format
  const date = moment().format("YYYY-MM-DD");
  console.log("Current Date:", date);

  // Fetch all doctors and their respective appointment counts in one query
  const doctors = await Doctor.find({});

  // Use aggregation to get appointment counts by doctor and slot
  const patientHistories = await PatientHistory.aggregate([
    {
      $unwind: "$Appointments",
    },
    {
      $match: {
        "Appointments.Date": date,
      },
    },
    {
      $group: {
        _id: {
          doctorID: "$Appointments.DoctID",
          slot: "$Appointments.Time",
        },
        count: { $sum: 1 },
      },
    },
  ]);

  // Create a map for easy access
  const slotCounts = {};
  patientHistories.forEach(({ _id, count }) => {
    const { doctorID, slot } = _id;
    if (!slotCounts[doctorID]) {
      slotCounts[doctorID] = { slot1: 0, slot2: 0 };
    }
    slotCounts[doctorID][slot === "slot1" ? "slot1" : "slot2"] = count;
  });

  // Prepare availability data
  const availability = doctors.map((doctor) => {
    const slot1Count = slotCounts[doctor.DID]?.slot1 || 0;
    const slot2Count = slotCounts[doctor.DID]?.slot2 || 0;

    return {
      doctorID: doctor.DID,
      doctorName: doctor.Name,
      doctorDegree: doctor.Degrees.join(", "),
      doctorSpeciality: doctor.Specialist,
      slot1:
        slot1Count >= 20 ? "not available" : `${20 - slot1Count} available`,
      slot2:
        slot2Count >= 20 ? "not available" : `${20 - slot2Count} available`,
    };
  });

  res.json(availability);
});

module.exports = {
  addAdmin,
  loginAdmin,
  getAllFeedback,
  updateAppointment,
  addDoctor,
  getAllDoctors,
  getAllAppointments,
  deleteAppointment,
  updateDoctor,
  deleteDoctor,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  getStatusCounts,
  getWeeklyCountsByDate,
  getWeeklyCounts,
  getDoctorAvailability,
};
