const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const supabase = require('../db');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Middleware to check if Supabase is configured
router.use((req, res, next) => {
  if (!process.env.SUPABASE_URL || process.env.SUPABASE_URL === 'your_supabase_url') {
    return res.status(500).json({ 
      error: 'Supabase not configured. Please set SUPABASE_URL and SUPABASE_KEY in .env file.' 
    });
  }
  next();
});

// Multer configuration for file uploads
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// User profile routes
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);

// Profile picture routes (users can manage their own profile pictures)
router.post('/profile/picture', upload.single('profilePicture'), userController.uploadProfilePicture);
router.put('/profile/picture', upload.single('profilePicture'), userController.updateProfilePicture);
router.get('/profile/picture', userController.getProfilePicture);
router.delete('/profile/picture', userController.deleteProfilePicture);

// Admin routes (admins can manage any user's profile picture)
router.get('/profile/picture/:userId', roleMiddleware('admin'), userController.getProfilePicture);
router.put('/profile/picture/:userId', roleMiddleware('admin'), upload.single('profilePicture'), userController.updateProfilePicture);
router.delete('/profile/picture/:userId', roleMiddleware('admin'), userController.deleteProfilePicture);

module.exports = router;