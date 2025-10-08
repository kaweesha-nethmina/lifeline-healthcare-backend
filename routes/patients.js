const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
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

// Patient profile routes
router.get('/profile', patientController.getPatientProfile);
router.put('/profile', patientController.updatePatientProfile);

// Doctor routes
router.get('/doctors', patientController.getAllDoctors);

// Insurance provider routes
router.get('/insurance-providers', patientController.getAllInsuranceProviders);

// Appointment routes
router.post('/appointments', patientController.bookAppointment);
router.get('/appointments', patientController.getAppointmentHistory);
router.put('/appointments/:id', patientController.updateAppointment);
router.delete('/appointments/:id', patientController.deleteAppointment);

// Medical records routes
router.get('/medical-records', patientController.getMedicalRecords);

// Vital signs routes
router.get('/vital-signs', patientController.getVitalSigns);

module.exports = router;