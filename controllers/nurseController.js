const supabase = require('../db');
const Nurse = require('../models/Nurse');

const nurseModel = new Nurse(supabase);

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const data = await nurseModel.getAllPatients();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const data = await nurseModel.getAllAppointments();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body;

    const data = await nurseModel.updateAppointmentStatus(appointmentId, status);
    res.status(200).json({ message: 'Appointment status updated successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add vitals for a patient
const addVitals = async (req, res) => {
  try {
    const patientId = req.params.id;
    const nurseId = req.user.id;
    const { vital_signs } = req.body;

    const data = await nurseModel.addVitals(patientId, nurseId, vital_signs);
    res.status(201).json({ message: 'Vitals added successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get patient vitals
const getPatientVitals = async (req, res) => {
  try {
    const patientId = req.params.id;
    const data = await nurseModel.getPatientVitals(patientId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add care record for a patient
const addCareRecord = async (req, res) => {
  try {
    const patientId = req.params.id;
    const nurseId = req.user.id;
    const careData = req.body;

    const data = await nurseModel.addCareRecord(patientId, nurseId, careData);
    res.status(201).json({ message: 'Care record added successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get care records for a patient
const getCareRecords = async (req, res) => {
  try {
    const patientId = req.params.id;
    const data = await nurseModel.getCareRecords(patientId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a care record
const updateCareRecord = async (req, res) => {
  try {
    const recordId = req.params.recordId;
    const updateData = req.body;

    const data = await nurseModel.updateCareRecord(recordId, updateData);
    res.status(200).json({ message: 'Care record updated successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a care record
const deleteCareRecord = async (req, res) => {
  try {
    const recordId = req.params.recordId;

    const data = await nurseModel.deleteCareRecord(recordId);
    res.status(200).json({ message: 'Care record deleted successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Patient Care Information (existing function)
const updatePatientCare = async (req, res) => {
  try {
    const patientId = req.params.id;
    const careData = req.body;

    const data = await nurseModel.addCareRecord(patientId, req.user.id, careData);
    res.status(201).json({ message: 'Patient care information updated successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Patient Care History (existing function)
const getPatientCareHistory = async (req, res) => {
  try {
    const patientId = req.params.id;
    const data = await nurseModel.getCareRecords(patientId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get patient medical records
const getPatientMedicalRecords = async (req, res) => {
  try {
    const patientId = req.params.id;
    const data = await nurseModel.getPatientMedicalRecords(patientId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPatients,
  getAllAppointments,
  updateAppointmentStatus,
  addVitals,
  getPatientVitals,
  addCareRecord,
  getCareRecords,
  updateCareRecord,
  deleteCareRecord,
  updatePatientCare,
  getPatientCareHistory,
  getPatientMedicalRecords
};