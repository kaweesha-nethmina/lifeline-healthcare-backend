const supabase = require('../db');
const User = require('../models/User');
const { uploadFile, deleteFile } = require('../utils/storageUtils');

const userModel = new User(supabase);

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await userModel.getProfile(userId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;
    
    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.email;
    delete updateData.password;
    delete updateData.role;
    delete updateData.created_at;
    
    const data = await userModel.updateProfile(userId, updateData);
    res.status(200).json({ message: 'Profile updated successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload profile picture
const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Generate a unique file name
    const fileExtension = req.file.originalname.split('.').pop();
    const fileName = `profile_${userId}_${Date.now()}.${fileExtension}`;
    
    // Upload file to Supabase storage
    const fileUrl = await uploadFile(req.file.buffer, fileName);
    
    // Update user profile with the new profile picture URL
    const data = await userModel.updateProfilePicture(userId, fileUrl);
    res.status(200).json({ message: 'Profile picture updated successfully', data, fileUrl });
  } catch (err) {
    console.error('Profile picture upload error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update profile picture (delete old and upload new)
const updateProfilePicture = async (req, res) => {
  try {
    // If admin, update profile picture for specified user, otherwise update own
    const userId = req.params.userId || req.user.id;
    
    // Check if admin is trying to access another user's profile picture
    if (req.params.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Get current profile to check if there's an existing profile picture
    const currentProfile = await userModel.getProfile(userId);
    const currentPictureUrl = currentProfile.profile_picture_url;
    
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
    const data = await userModel.updateProfilePicture(userId, fileUrl);
    res.status(200).json({ message: 'Profile picture updated successfully', data, fileUrl });
  } catch (err) {
    console.error('Profile picture update error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get profile picture
const getProfilePicture = async (req, res) => {
  try {
    // If admin, get profile picture for specified user, otherwise get own
    const userId = req.params.userId || req.user.id;
    
    // Check if admin is trying to access another user's profile picture
    if (req.params.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    const profilePictureUrl = await userModel.getProfilePicture(userId);
    res.status(200).json({ profile_picture_url: profilePictureUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete profile picture
const deleteProfilePicture = async (req, res) => {
  try {
    // If admin, delete profile picture for specified user, otherwise delete own
    const userId = req.params.userId || req.user.id;
    
    // Check if admin is trying to access another user's profile picture
    if (req.params.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    // Get current profile picture URL to delete from storage
    const currentProfile = await userModel.getProfile(userId);
    const currentPictureUrl = currentProfile.profile_picture_url;
    
    if (currentPictureUrl) {
      // Extract file name from URL
      try {
        const urlParts = currentPictureUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        
        // Delete file from Supabase storage
        await deleteFile(fileName);
      } catch (deleteErr) {
        console.error('Error deleting file from storage:', deleteErr);
        // Continue with database update even if file deletion fails
      }
    }
    
    // Update user profile to remove profile picture URL
    const data = await userModel.deleteProfilePicture(userId);
    res.status(200).json({ message: 'Profile picture deleted successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  updateProfilePicture,
  getProfilePicture,
  deleteProfilePicture
};