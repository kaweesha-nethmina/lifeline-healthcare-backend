const supabase = require('../db');
const Prescription = require('../models/Prescription');
const { medicalRecordExists } = require('../utils/validationUtils');

const prescriptionModel = new Prescription(supabase);

// Get prescriptions by medical record ID
const getPrescriptionsByMedicalRecord = async (req, res) => {
  try {
    const medicalRecordId = req.params.medicalRecordId;
    
    // Validate that the medical record exists
    const recordExists = await medicalRecordExists(medicalRecordId);
    if (!recordExists) {
      return res.status(400).json({ error: 'Medical record not found' });
    }
    
    const data = await prescriptionModel.getPrescriptionsByMedicalRecord(medicalRecordId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new prescription
const createPrescription = async (req, res) => {
  try {
    const { medical_record_id, medication, dosage, pharmacy_id } = req.body;
    
    // Validate that the medical record exists
    const recordExists = await medicalRecordExists(medical_record_id);
    if (!recordExists) {
      return res.status(400).json({ error: 'Medical record not found' });
    }

    const prescriptionData = {
      medical_record_id,
      medication,
      dosage,
      pharmacy_id
    };

    const data = await prescriptionModel.createPrescription(prescriptionData);
    res.status(201).json({ message: 'Prescription created successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a prescription
const updatePrescription = async (req, res) => {
  try {
    const prescriptionId = req.params.id;
    const { medication, dosage, pharmacy_id } = req.body;

    const updateData = {
      medication,
      dosage,
      pharmacy_id,
      updated_at: new Date()
    };

    const data = await prescriptionModel.updatePrescription(prescriptionId, updateData);
    res.status(200).json({ message: 'Prescription updated successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a prescription
const deletePrescription = async (req, res) => {
  try {
    const prescriptionId = req.params.id;
    const data = await prescriptionModel.deletePrescription(prescriptionId);
    res.status(200).json({ message: 'Prescription deleted successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getPrescriptionsByMedicalRecord,
  createPrescription,
  updatePrescription,
  deletePrescription
};