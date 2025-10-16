const express = require('express');
const router = express.Router();
const healthcareManagerController = require('../controllers/healthcareManagerController');
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

// View healthcare data and analytics
router.get('/data', healthcareManagerController.getHealthcareData);

// Get resource utilization
router.get('/resources', healthcareManagerController.getResourceUtilization);

module.exports = router;