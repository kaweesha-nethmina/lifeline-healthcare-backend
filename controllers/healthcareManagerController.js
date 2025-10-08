const supabase = require('../db');
const HealthcareManager = require('../models/HealthcareManager');

const managerModel = new HealthcareManager(supabase);

// View Healthcare Data and Analytics
const getHealthcareData = async (req, res) => {
  try {
    const analyticsData = await managerModel.getAnalyticsData();
    const resourceData = await managerModel.getResourceUtilization();
    
    res.status(200).json({
      analytics: analyticsData,
      resources: resourceData
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Resource Utilization
const getResourceUtilization = async (req, res) => {
  try {
    const data = await managerModel.getResourceUtilization();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getHealthcareData,
  getResourceUtilization
};