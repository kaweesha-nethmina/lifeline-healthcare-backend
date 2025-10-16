const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/jwtUtils');

class Auth {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Register a new user
  async register(userData) {
    // Hash the password
    const hashedPassword = await hashPassword(userData.password);
    
    // Create user in users table
    const { data, error } = await this.supabase
      .from('users')
      .insert([
        {
          ...userData,
          password: hashedPassword,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Create role-specific record
  async createRoleRecord(role, userId) {
    let data, error;
    switch (role) {
      case 'patient':
        ({ data, error } = await this.supabase
          .from('patients')
          .insert([{ user_id: userId }]));
        break;
      case 'doctor':
        ({ data, error } = await this.supabase
          .from('doctors')
          .insert([{ user_id: userId }]));
        break;
      case 'provider':
        // Get user details to create insurance provider record
        const { data: userData, error: userError } = await this.supabase
          .from('users')
          .select('name, email')
          .eq('id', userId)
          .single();
        
        if (userError) throw new Error(userError.message);
        
        // Create insurance provider record
        ({ data, error } = await this.supabase
          .from('insurance_providers')
          .insert([{
            name: userData.name,
            contact_info: userData.email
          }]));
        break;
      // Add cases for other roles as needed
    }

    if (error) throw new Error(error.message);
    return data;
  }

  // Login user
  async login(email, password) {
    // Get user from users table
    const { data: userData, error: userError } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      throw new Error('Invalid credentials');
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, userData.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken({
      id: userData.id,
      email: userData.email,
      role: userData.role,
    });

    return {
      token,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
      },
    };
  }
}

module.exports = Auth;