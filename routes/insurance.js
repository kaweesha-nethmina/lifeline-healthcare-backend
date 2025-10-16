const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insuranceController');
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

// Insurance provider routes
router.get('/providers', insuranceController.getInsuranceProviders);

// Insurance claim routes
router.post('/verify-eligibility', insuranceController.verifyInsuranceEligibility);
router.post('/process-claim', insuranceController.processInsuranceClaim);
router.get('/claims/:patientId', insuranceController.getPatientInsuranceClaims);

module.exports = router;