const supabase = require('../db');
const Auth = require('../models/Auth');

const authModel = new Auth(supabase);

// Register User
const register = async (req, res) => {
  try {
    const { email, name, role, password } = req.body;

    // Check if Supabase is properly configured
    if (!process.env.SUPABASE_URL || process.env.SUPABASE_URL === 'your_supabase_url') {
      return res.status(500).json({ 
        error: 'Supabase not configured. Please set SUPABASE_URL and SUPABASE_KEY in .env file.' 
      });
    }

    // Create user
    const userData = { email, name, role, password };
    const user = await authModel.register(userData);

    // Create role-specific record based on user role
    await authModel.createRoleRecord(role, user.id);

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if Supabase is properly configured
    if (!process.env.SUPABASE_URL || process.env.SUPABASE_URL === 'your_supabase_url') {
      return res.status(500).json({ 
        error: 'Supabase not configured. Please set SUPABASE_URL and SUPABASE_KEY in .env file.' 
      });
    }

    // Login user
    const result = await authModel.login(email, password);

    res.status(200).json({
      message: 'Login successful',
      ...result,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  register,
  login
};