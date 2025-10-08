const supabase = require('../db');
const Staff = require('../models/Staff');

const staffModel = new Staff(supabase);

// Patient Check-In
const patientCheckIn = async (req, res) => {
  try {
    const patientId = req.params.id;
    const checkInData = req.body;

    // Get patient information (without updating the patient record)
    const patientData = await staffModel.patientCheckIn(patientId);
    
    // Create check-in record in the check_ins table
    const checkInRecord = await staffModel.createCheckInRecord({
      patient_id: patientId,
      ...checkInData
    });

    res.status(200).json({ 
      message: 'Patient checked in successfully', 
      patient: patientData,
      checkInRecord 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Confirm Payment for Patient
const confirmPayment = async (req, res) => {
  try {
    const patientId = req.params.id;
    const paymentData = req.body;

    // Create payment record in the payments table
    const paymentRecord = await staffModel.createPaymentRecord({
      patient_id: patientId,
      ...paymentData,
      payment_status: 'confirmed',
      payment_date: new Date().toISOString()
    });

    res.status(200).json({ 
      message: 'Payment confirmed successfully', 
      payment: paymentRecord
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Patient Information with Check-in History
const getPatientInfo = async (req, res) => {
  try {
    const patientId = req.params.id;
    const data = await staffModel.getPatientInfoWithCheckIns(patientId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await staffModel.getAllPatients();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await staffModel.getAllDoctors();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Pending Check-Ins (patients with confirmed or booked appointments)
const getPendingCheckIns = async (req, res) => {
  try {
    const pendingCheckIns = await staffModel.getPendingCheckIns();
    res.status(200).json(pendingCheckIns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Checked-In Patients
const getCheckedInPatients = async (req, res) => {
  try {
    const checkedInPatients = await staffModel.getCheckedInPatients();
    res.status(200).json(checkedInPatients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Comprehensive Patient Details by ID
const getPatientDetailsById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patientDetails = await staffModel.getPatientDetailsById(patientId);
    res.status(200).json(patientDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await staffModel.getAllPayments();
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Payment by ID
const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await staffModel.getPaymentById(paymentId);
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  patientCheckIn,
  confirmPayment,
  getPatientInfo,
  getAllPatients,
  getAllDoctors,
  getPendingCheckIns,
  getCheckedInPatients,
  getPatientDetailsById,
  getAllPayments,
  getPaymentById
};