const supabase = require('../db');
const Emergency = require('../models/Emergency');
const { patientExists, emergencyResourceExists } = require('../utils/validationUtils');

const emergencyModel = new Emergency(supabase);

// Log and allocate resources for emergency cases
const logEmergencyCase = async (req, res) => {
  try {
    const { patient_id, emergency_type, resource_id } = req.body;
    
    // Validate that the patient exists
    const patientExistsResult = await patientExists(patient_id);
    if (!patientExistsResult) {
      return res.status(400).json({ error: 'Patient not found' });
    }
    
    // Validate that the emergency resource exists
    const resourceExistsResult = await emergencyResourceExists(resource_id);
    if (!resourceExistsResult) {
      return res.status(400).json({ error: 'Emergency resource not found' });
    }

    const case_status = 'waiting'; // Default status

    const caseData = {
      patient_id,
      case_status,
      emergency_type,
      resource_id,
    };

    const data = await emergencyModel.createCase(caseData);
    
    // Update resource status to 'in-use'
    await emergencyModel.updateResourceStatus(resource_id, 'in-use');

    res.status(201).json({ message: 'Emergency case logged successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View available emergency resources
const getAvailableResources = async (req, res) => {
  try {
    const data = await emergencyModel.getAvailableResources();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all emergency cases
const getAllEmergencyCases = async (req, res) => {
  try {
    const data = await emergencyModel.getAllCases();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update emergency case status
const updateEmergencyCaseStatus = async (req, res) => {
  try {
    const caseId = req.params.id;
    const { case_status, resource_id } = req.body;
    
    // If resource_id is provided, validate that it exists
    if (resource_id) {
      const resourceExistsResult = await emergencyResourceExists(resource_id);
      if (!resourceExistsResult) {
        return res.status(400).json({ error: 'Emergency resource not found' });
      }
    }

    const updateData = {
      case_status,
      resource_id,
      updated_at: new Date()
    };

    const data = await emergencyModel.updateCase(caseId, updateData);
    
    // If case is completed and resource_id is provided, update resource status to 'available'
    if (case_status === 'completed' && resource_id) {
      await emergencyModel.updateResourceStatus(resource_id, 'available');
    }

    res.status(200).json({ message: 'Emergency case updated successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create emergency resource
const createEmergencyResource = async (req, res) => {
  try {
    const { resource_type, location, status } = req.body;

    const resourceData = {
      resource_type,
      location,
      status: status || 'available' // Default to available if not provided
    };

    const data = await emergencyModel.createResource(resourceData);
    res.status(201).json({ message: 'Emergency resource created successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  logEmergencyCase,
  getAvailableResources,
  getAllEmergencyCases,
  updateEmergencyCaseStatus,
  createEmergencyResource
};