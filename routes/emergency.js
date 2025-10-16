const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');
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

// Emergency case routes
router.post('/emergency', emergencyController.logEmergencyCase);
router.get('/cases', emergencyController.getAllEmergencyCases);
router.put('/cases/:id', emergencyController.updateEmergencyCaseStatus);

// Emergency resource routes
router.get('/resources', emergencyController.getAvailableResources);
router.post('/resources', emergencyController.createEmergencyResource);

module.exports = router;
