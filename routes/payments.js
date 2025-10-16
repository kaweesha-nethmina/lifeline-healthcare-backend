const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
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

// Payment routes
router.post('/process-payment', paymentController.processPayment);
router.get('/payment-history/:patientId', paymentController.getPaymentHistory);
router.get('/:id', paymentController.getPaymentById);

module.exports = router;