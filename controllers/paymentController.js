const supabase = require('../db');
const Payment = require('../models/Payment');

const paymentModel = new Payment(supabase);

// Process patient payment
const processPayment = async (req, res) => {
  try {
    const { patient_id, amount, payment_method } = req.body;
    const payment_status = 'pending'; // Default status

    const paymentData = {
      patient_id,
      amount,
      payment_method,
      payment_status,
    };

    const data = await paymentModel.processPayment(paymentData);
    
    // In a real implementation, you would integrate with a payment gateway here
    // For now, we'll just mark the payment as completed
    const updatedData = await paymentModel.updatePaymentStatus(data.id, 'completed');

    res.status(201).json({ message: 'Payment processed successfully', data: updatedData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View payment history
const getPaymentHistory = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const data = await paymentModel.getPaymentHistory(patientId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const data = await paymentModel.getPaymentById(paymentId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  processPayment,
  getPaymentHistory,
  getPaymentById
};