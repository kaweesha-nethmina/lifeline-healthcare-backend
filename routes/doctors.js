const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
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

// Doctor profile routes
router.get('/profile', doctorController.getDoctorProfile);
router.put('/profile', doctorController.updateDoctorProfile);

// Medical records routes
router.get('/patients/:id/medical-records', doctorController.getPatientMedicalRecords);
router.post('/patients/:id/medical-records', doctorController.createMedicalRecord);
router.get('/medical-records/:recordId', doctorController.getMedicalRecordById);
router.put('/medical-records/:recordId', doctorController.updateMedicalRecord);
router.delete('/medical-records/:recordId', doctorController.deleteMedicalRecord);

// Appointment routes
router.get('/appointments', doctorController.getAppointmentSchedule);

// Patients routes
router.get('/patients', doctorController.getDoctorPatients);

// Medical records routes
router.get('/medical-records', doctorController.getAllMedicalRecords);

// Patient details route
router.get('/patients/:id/details', doctorController.getPatientDetails);

// Appointment details by patient route
router.get('/patients/:id/appointments', doctorController.getAppointmentDetailsByPatient);

module.exports = router;