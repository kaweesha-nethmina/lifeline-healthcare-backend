const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurseController');
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

// Get all patients
router.get('/patients', nurseController.getAllPatients);

// Get all appointments
router.get('/appointments', nurseController.getAllAppointments);

// Update appointment status
router.put('/appointments/:id/status', nurseController.updateAppointmentStatus);

// Add vitals for a patient
router.post('/patients/:id/vitals', nurseController.addVitals);

// Get patient vitals
router.get('/patients/:id/vitals', nurseController.getPatientVitals);

// Add care record for a patient
router.post('/patients/:id/care-records', nurseController.addCareRecord);

// Get care records for a patient
router.get('/patients/:id/care-records', nurseController.getCareRecords);

// Update a care record
router.put('/care-records/:recordId', nurseController.updateCareRecord);

// Delete a care record
router.delete('/care-records/:recordId', nurseController.deleteCareRecord);

// Update patient care information (existing route)
router.post('/patients/:id/care', nurseController.updatePatientCare);

// Get patient care history (existing route)
router.get('/patients/:id/care', nurseController.getPatientCareHistory);

// Get patient medical records
router.get('/patients/:id/medical-records', nurseController.getPatientMedicalRecords);

module.exports = router;