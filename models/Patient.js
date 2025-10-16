class Patient {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Get patient profile with user details including profile picture and new fields
  async getProfile(userId) {
    const { data, error } = await this.supabase
      .from('patients')
      .select(`
        *,
        users (
          id,
          email,
          name,
          role,
          profile_picture_url,
          phone_number,
          date_of_birth,
          gender,
          address,
          emergency_contact,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', userId)
      .single();

    if (error) throw new Error(error.message);
    
    // Restructure the response to include user details at the top level
    return {
      id: data.id,
      user_id: data.user_id,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      phone_number: data.phone_number,
      address: data.address,
      insurance_details: data.insurance_details,
      medical_history: data.medical_history,
      emergency_contact: data.emergency_contact,
      preferred_location: data.preferred_location,
      created_at: data.created_at,
      updated_at: data.updated_at,
      user: {
        id: data.users.id,
        email: data.users.email,
        name: data.users.name,
        role: data.users.role,
        profile_picture_url: data.users.profile_picture_url,
        phone_number: data.users.phone_number,
        date_of_birth: data.users.date_of_birth,
        gender: data.users.gender,
        address: data.users.address,
        emergency_contact: data.users.emergency_contact,
        created_at: data.users.created_at,
        updated_at: data.users.updated_at
      }
    };
  }

  // Update patient profile
  async updateProfile(userId, updateData) {
    const { data, error } = await this.supabase
      .from('patients')
      .update(updateData)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Book appointment
  async bookAppointment(appointmentData) {
    const { data, error } = await this.supabase
      .from('appointments')
      .insert([appointmentData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Update appointment
  async updateAppointment(appointmentId, patientId, updateData) {
    const { data, error } = await this.supabase
      .from('appointments')
      .update(updateData)
      .eq('id', appointmentId)
      .eq('patient_id', patientId) // Ensure patient can only update their own appointments
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Delete appointment
  async deleteAppointment(appointmentId, patientId) {
    const { data, error } = await this.supabase
      .from('appointments')
      .delete()
      .eq('id', appointmentId)
      .eq('patient_id', patientId) // Ensure patient can only delete their own appointments
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get appointment history with doctor details
  async getAppointmentHistory(patientId) {
    const { data, error } = await this.supabase
      .from('appointments')
      .select(`
        id,
        patient_id,
        doctor_id,
        appointment_date,
        status,
        location,
        created_at,
        updated_at,
        doctors (
          user_id,
          specialty,
          schedule,
          users (
            name
          )
        )
      `)
      .eq('patient_id', patientId)
      .order('appointment_date', { ascending: false });

    if (error) throw new Error(error.message);
    
    // Format the response to include doctor name and extract location from schedule if possible
    const formattedData = data.map(appointment => {
      // Try to extract location from schedule if it's a string containing location info
      let doctorLocation = null;
      if (appointment.doctors?.schedule) {
        // Simple extraction - in a real app, this would be more sophisticated
        const schedule = appointment.doctors.schedule.toLowerCase();
        if (schedule.includes('hospital') || schedule.includes('clinic')) {
          // Extract potential location from schedule
          const locationMatch = schedule.match(/(hospital|clinic)[^,.;]*/gi);
          if (locationMatch) {
            doctorLocation = locationMatch[0].trim();
          }
        }
      }
      
      return {
        ...appointment,
        doctor_name: appointment.doctors?.users?.name || null,
        doctor_location: doctorLocation
      };
    });
    
    return formattedData;
  }

  // Get medical records
  async getMedicalRecords(patientId) {
    const { data, error } = await this.supabase
      .from('medical_records')
      .select(`
        *,
        doctors (
          user_id
        )
      `)
      .eq('patient_id', patientId)
      .order('record_date', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  // Get vital signs for a patient
  async getVitalSigns(patientId) {
    const { data, error } = await this.supabase
      .from('nurse_vitals')
      .select(`
        *,
        users (
          name
        )
      `)
      .eq('patient_id', patientId)
      .order('recorded_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }
}

module.exports = Patient;