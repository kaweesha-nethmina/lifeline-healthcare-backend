const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
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

// Patient check-in
router.post('/check-in/:id', staffController.patientCheckIn);

// Confirm payment for patient
router.post('/patients/:id/confirm-payment', staffController.confirmPayment);

// Get patient information
router.get('/patients/:id', staffController.getPatientInfo);

// Get all patients
router.get('/patients', staffController.getAllPatients);

// Get all doctors
router.get('/doctors', staffController.getAllDoctors);

// Get pending check-ins (patients with confirmed or booked appointments)
router.get('/pending-check-ins', staffController.getPendingCheckIns);

// Get checked-in patients
router.get('/checked-in-patients', staffController.getCheckedInPatients);

// Get comprehensive patient details by ID
router.get('/patients/:id/details', staffController.getPatientDetailsById);

// Get all payments
router.get('/payments', staffController.getAllPayments);

// Get payment by ID
router.get('/payments/:id', staffController.getPaymentById);

module.exports = router;