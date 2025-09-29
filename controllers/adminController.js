const supabase = require('../db');
const Admin = require('../models/Admin');

const adminModel = new Admin(supabase);

// Create users (admin, doctor, nurse, etc.)
const createUser = async (req, res) => {
  try {
    const { email, name, role, password } = req.body;

    // Create user in users table
    const userData = {
      email,
      name,
      role,
      password, // In practice, this should be hashed
    };

    const user = await adminModel.createUser(userData);
    
    // Create role-specific record based on user role
    await adminModel.createRoleRecord(role, user.id);

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Configure departments, services, etc.
const configureSystem = async (req, res) => {
  try {
    // This would handle system configuration
    // For now, we'll just return a success message
    res.status(200).json({ message: 'System configured successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await adminModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Update user in users table
    const user = await adminModel.updateUser(userId, updateData);

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete user and related records
    const user = await adminModel.deleteUser(userId);

    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await adminModel.getAllAppointments();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await adminModel.getAppointmentById(appointmentId);
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body;
    
    const appointment = await adminModel.updateAppointmentStatus(appointmentId, status);
    res.status(200).json({ message: 'Appointment status updated successfully', appointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    
    const appointment = await adminModel.deleteAppointment(appointmentId);
    res.status(200).json({ message: 'Appointment deleted successfully', appointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generate appointment report
const generateAppointmentReport = async (req, res) => {
  try {
    const filters = req.query;
    const report = await adminModel.generateAppointmentReport(filters);
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get doctor performance report
const getDoctorPerformanceReport = async (req, res) => {
  try {
    const performance = await adminModel.getDoctorPerformanceReport();
    res.status(200).json(performance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generate monthly user activity report
const generateMonthlyUserActivityReport = async (req, res) => {
  try {
    const { month, year } = req.query;
    
    // Validate parameters
    if (!month || !year) {
      return res.status(400).json({ 
        error: 'Month and year parameters are required' 
      });
    }
    
    const report = await adminModel.generateMonthlyUserActivityReport(
      parseInt(month), 
      parseInt(year)
    );
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointment statistics
const getAppointmentStatistics = async (req, res) => {
  try {
    const statistics = await adminModel.getAppointmentStatistics();
    res.status(200).json(statistics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get medical records summary
const getMedicalRecordsSummary = async (req, res) => {
  try {
    const summary = await adminModel.getMedicalRecordsSummary();
    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Change any user's profile picture
const changeUserProfilePicture = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Import the necessary modules
    const { uploadFile, deleteFile } = require('../utils/storageUtils');
    
    // Get current profile to check if there's an existing profile picture
    const currentPictureUrl = await adminModel.getUserProfilePicture(userId);
    
    // Delete existing profile picture from storage if it exists
    if (currentPictureUrl) {
      try {
        const urlParts = currentPictureUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        await deleteFile(fileName);
      } catch (deleteErr) {
        console.error('Error deleting existing file from storage:', deleteErr);
        // Continue with upload even if deletion fails
      }
    }
    
    // Generate a unique file name for the new picture
    const fileExtension = req.file.originalname.split('.').pop();
    const fileName = `profile_${userId}_${Date.now()}.${fileExtension}`;
    
    // Upload new file to Supabase storage
    const fileUrl = await uploadFile(req.file.buffer, fileName);
    
    // Update user profile with the new profile picture URL
    const data = await adminModel.updateUserProfilePicture(userId, fileUrl);
    res.status(200).json({ message: 'User profile picture updated successfully', data, fileUrl });
  } catch (err) {
    console.error('Profile picture update error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  configureSystem,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
  generateAppointmentReport,
  getAppointmentStatistics,
  getDoctorPerformanceReport,
  generateMonthlyUserActivityReport,
  getMedicalRecordsSummary,
  changeUserProfilePicture
};