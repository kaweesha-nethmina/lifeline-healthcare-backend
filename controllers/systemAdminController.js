const supabase = require('../db');
const SystemAdmin = require('../models/SystemAdmin');

const adminModel = new SystemAdmin(supabase);

// System Maintenance and Security Management
const performSystemMaintenance = async (req, res) => {
  try {
    const maintenanceData = req.body;
    
    const data = await adminModel.performMaintenance(maintenanceData);
    res.status(200).json({ message: 'System maintenance completed successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Monitor System Logs
const getSystemLogs = async (req, res) => {
  try {
    const data = await adminModel.getSystemLogs();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create System Backup
const createSystemBackup = async (req, res) => {
  try {
    const backupData = req.body;
    
    const data = await adminModel.createBackup(backupData);
    res.status(201).json({ message: 'Backup created successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  performSystemMaintenance,
  getSystemLogs,
  createSystemBackup
};