// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/adminController");

router.post("/addadmin", addAdmin);
router.post("/login", loginAdmin);
router.route("/feedbacks").get(getAllFeedback);
router.route("/appointments/:appointmentId").put(updateAppointment);
router.route("/adddoctor").post(addDoctor);
router.route("/doctors").get(getAllDoctors);
router.route("/appointments").get(getAllAppointments);
router.route("/deleteAppointment/:appointmentId").delete(deleteAppointment);
router.route("/updateDoctor/:did").put(updateDoctor);
router.route("/deleteDoctor/:did").delete(deleteDoctor);
router.route("/admins").get(getAllAdmins);
router.route("/updateAdmin/:adminId").put(updateAdmin);
router.delete("/deleteAdmin/:adminId", deleteAdmin);
router.get("/getStatusCounts", getStatusCounts);
// ============================= update by krunal=================
router.post("/getWeeklyCountsByDate", getWeeklyCountsByDate);
// ============================= update by krunal=================

router.get("/getWeeklyCounts", getWeeklyCounts);

router.get("/getDoctorAvailability", getDoctorAvailability);

module.exports = router;
