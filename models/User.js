class User {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Get user profile with explicit selection of all fields including new profile fields
  async getProfile(userId) {
    const { data, error } = await this.supabase
      .from('users')
      .select(`
        id,
        email,
        name,
        role,
        password,
        profile_picture_url,
        phone_number,
        date_of_birth,
        gender,
        address,
        emergency_contact,
        created_at,
        updated_at
      `)
      .eq('id', userId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Update user profile
  async updateProfile(userId, updateData) {
    const { data, error } = await this.supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Update profile picture URL
  async updateProfilePicture(userId, profilePictureUrl) {
    const { data, error } = await this.supabase
      .from('users')
      .update({ profile_picture_url: profilePictureUrl })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get profile picture URL
  async getProfilePicture(userId) {
    const { data, error } = await this.supabase
      .from('users')
      .select('profile_picture_url')
      .eq('id', userId)
      .single();

    if (error) throw new Error(error.message);
    return data.profile_picture_url;
  }

  // Delete profile picture URL (set to null)
  async deleteProfilePicture(userId) {
    const { data, error } = await this.supabase
      .from('users')
      .update({ profile_picture_url: null })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}

module.exports = User;