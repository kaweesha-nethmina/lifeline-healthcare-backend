const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
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

// Prescription routes
router.get('/medical-record/:medicalRecordId', prescriptionController.getPrescriptionsByMedicalRecord);
router.post('/', prescriptionController.createPrescription);
router.put('/:id', prescriptionController.updatePrescription);
router.delete('/:id', prescriptionController.deletePrescription);

module.exports = router;