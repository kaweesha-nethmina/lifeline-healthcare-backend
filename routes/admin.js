const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const supabase = require('../db');

// Middleware to check if Supabase is configured
router.use((req, res, next) => {
  if (!process.env.SUPABASE_URL || process.env.SUPABASE_URL === 'your_supabase_url') {
    return res.status(500).json({ 
      error: 'Supabase not configured. Please set SUPABASE_URL and SUPABASE_KEY in .env file.' 
    });
  }
  next();
});

// Multer configuration for file uploads
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create users (admin, doctor, nurse, etc.)
router.post('/create-user', adminController.createUser);

// Configure departments, services, etc.
router.post('/configure-system', adminController.configureSystem);

// Get all users
router.get('/users', adminController.getAllUsers);

// Update a user
router.put('/users/:id', adminController.updateUser);

// Delete a user
router.delete('/users/:id', adminController.deleteUser);

// Get all appointments
router.get('/appointments', adminController.getAllAppointments);

// Get appointment by ID
router.get('/appointments/:id', adminController.getAppointmentById);

// Update appointment status
router.put('/appointments/:id/status', adminController.updateAppointmentStatus);

// Delete appointment
router.delete('/appointments/:id', adminController.deleteAppointment);

// Generate appointment report
router.get('/reports/appointments', adminController.generateAppointmentReport);

// Get doctor performance report
router.get('/reports/doctors/performance', adminController.getDoctorPerformanceReport);

// Generate monthly user activity report
router.get('/reports/users/activity', adminController.generateMonthlyUserActivityReport);

// Get appointment statistics
router.get('/reports/appointments/statistics', adminController.getAppointmentStatistics);

// Get medical records summary
router.get('/reports/medical-records/summary', adminController.getMedicalRecordsSummary);

// Change any user's profile picture
router.put('/users/:userId/profile-picture', upload.single('profilePicture'), adminController.changeUserProfilePicture);

module.exports = router;