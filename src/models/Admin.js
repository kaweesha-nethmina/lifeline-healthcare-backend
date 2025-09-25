class Admin {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Create a new user
  async createUser(userData) {
    const { data, error } = await this.supabase
      .from('users')
      .insert([userData])
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
      // Add cases for other roles as needed
    }

    if (error) throw new Error(error.message);
    return data;
  }

  // Get all users with profile picture
  async getAllUsers() {
    const { data, error } = await this.supabase
      .from('users')
      .select(`
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
      `)
      .order('name', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  // Update a user by ID
  async updateUser(userId, userData) {
    // Remove fields that shouldn't be updated directly
    delete userData.id;
    delete userData.email; // Email should not be changed
    delete userData.password; // Password should be changed through a separate endpoint
    delete userData.created_at;

    const { data, error } = await this.supabase
      .from('users')
      .update(userData)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Delete a user by ID
  async deleteUser(userId) {
    // First, delete role-specific records
    // This will cascade delete from the users table due to foreign key constraints
    const { error: patientError } = await this.supabase
      .from('patients')
      .delete()
      .eq('user_id', userId);

    const { error: doctorError } = await this.supabase
      .from('doctors')
      .delete()
      .eq('user_id', userId);

    // If there were specific role tables, we would delete from them here as well

    // Then delete the user record
    const { data, error } = await this.supabase
      .from('users')
      .delete()
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get all appointments with patient and doctor details
  async getAllAppointments() {
    const { data, error } = await this.supabase
      .from('appointments')
      .select(`
        *,
        patients (
          id,
          user_id,
          users (
            name,
            email
          )
        ),
        doctors (
          id,
          user_id,
          users (
            name,
            email
          )
        )
      `)
      .order('appointment_date', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  // Get appointment by ID with full details
  async getAppointmentById(appointmentId) {
    const { data, error } = await this.supabase
      .from('appointments')
      .select(`
        *,
        patients (
          id,
          user_id,
          date_of_birth,
          gender,
          phone_number,
          address,
          insurance_details,
          medical_history,
          emergency_contact,
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
        ),
        doctors (
          id,
          user_id,
          specialty,
          qualification,
          schedule,
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
        )
      `)
      .eq('id', appointmentId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Update appointment status
  async updateAppointmentStatus(appointmentId, status) {
    const { data, error } = await this.supabase
      .from('appointments')
      .update({ 
        status,
        updated_at: new Date()
      })
      .eq('id', appointmentId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Delete appointment
  async deleteAppointment(appointmentId) {
    const { data, error } = await this.supabase
      .from('appointments')
      .delete()
      .eq('id', appointmentId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Generate appointment report
  async generateAppointmentReport(filters = {}) {
    let query = this.supabase
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
        patients (
          id,
          user_id,
          users (
            name,
            email
          )
        ),
        doctors (
          id,
          user_id,
          users (
            name,
            email
          )
        )
      `)
      .order('appointment_date', { ascending: false });

    // Apply filters if provided
    if (filters.startDate) {
      query = query.gte('appointment_date', filters.startDate);
    }
    
    if (filters.endDate) {
      query = query.lte('appointment_date', filters.endDate);
    }
    
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters.doctorId) {
      query = query.eq('doctor_id', filters.doctorId);
    }
    
    if (filters.patientId) {
      query = query.eq('patient_id', filters.patientId);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data;
  }

  // Get doctor performance report
  async getDoctorPerformanceReport() {
    // First, get all appointments with doctor and status information
    const { data: appointments, error: appointmentsError } = await this.supabase
      .from('appointments')
      .select(`
        doctor_id,
        doctors (
          id,
          user_id,
          users (
            name
          )
        ),
        status
      `);

    if (appointmentsError) throw new Error(appointmentsError.message);
    
    // Transform the data into a more usable format
    const performance = {};
    
    appointments.forEach(item => {
      const doctorId = item.doctor_id;
      const doctorName = item.doctors?.users?.name || 'Unknown Doctor';
      const status = item.status;
      
      if (!performance[doctorId]) {
        performance[doctorId] = {
          name: doctorName,
          total: 0,
          byStatus: {}
        };
      }
      
      if (!performance[doctorId].byStatus[status]) {
        performance[doctorId].byStatus[status] = 0;
      }
      
      performance[doctorId].byStatus[status]++;
      performance[doctorId].total++;
    });
    
    return performance;
  }

  // Generate monthly user activity report
  async generateMonthlyUserActivityReport(month, year) {
    // Get user registration data for the specified month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // Last day of the month
    
    const { data: userData, error: userError } = await this.supabase
      .from('users')
      .select(`
        id,
        role,
        created_at
      `)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .order('created_at', { ascending: true });

    if (userError) throw new Error(userError.message);

    // Get appointment data for the specified month
    const { data: appointmentData, error: appointmentError } = await this.supabase
      .from('appointments')
      .select(`
        id,
        patient_id,
        doctor_id,
        status,
        created_at
      `)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .order('created_at', { ascending: true });

    if (appointmentError) throw new Error(appointmentError.message);

    // Get medical records data for the specified month
    const { data: medicalRecordData, error: medicalRecordError } = await this.supabase
      .from('medical_records')
      .select(`
        id,
        patient_id,
        doctor_id,
        record_date
      `)
      .gte('record_date', startDate.toISOString().split('T')[0]) // Date comparison for record_date
      .lte('record_date', endDate.toISOString().split('T')[0])   // Date comparison for record_date
      .order('record_date', { ascending: true });

    if (medicalRecordError) throw new Error(medicalRecordError.message);

    // Process data into report format
    const report = {
      month: `${month}/${year}`,
      userRegistrations: {
        total: userData.length,
        byRole: {}
      },
      appointments: {
        total: appointmentData.length,
        byStatus: {}
      },
      medicalRecords: {
        total: medicalRecordData.length
      },
      dailyActivity: {}
    };

    // Count user registrations by role
    userData.forEach(user => {
      if (!report.userRegistrations.byRole[user.role]) {
        report.userRegistrations.byRole[user.role] = 0;
      }
      report.userRegistrations.byRole[user.role]++;
      
      // Track daily activity
      const date = new Date(user.created_at).toISOString().split('T')[0];
      if (!report.dailyActivity[date]) {
        report.dailyActivity[date] = { registrations: 0, appointments: 0, medicalRecords: 0 };
      }
      report.dailyActivity[date].registrations++;
    });

    // Count appointments by status
    appointmentData.forEach(appointment => {
      if (!report.appointments.byStatus[appointment.status]) {
        report.appointments.byStatus[appointment.status] = 0;
      }
      report.appointments.byStatus[appointment.status]++;
      
      // Track daily activity
      const date = new Date(appointment.created_at).toISOString().split('T')[0];
      if (!report.dailyActivity[date]) {
        report.dailyActivity[date] = { registrations: 0, appointments: 0, medicalRecords: 0 };
      }
      report.dailyActivity[date].appointments++;
    });

    // Count medical records
    medicalRecordData.forEach(record => {
      // Track daily activity
      const date = record.record_date; // Already in date format
      if (!report.dailyActivity[date]) {
        report.dailyActivity[date] = { registrations: 0, appointments: 0, medicalRecords: 0 };
      }
      report.dailyActivity[date].medicalRecords++;
    });

    return report;
  }

  // Get appointment statistics
  async getAppointmentStatistics() {
    // Get all appointments
    const { data: appointments, error } = await this.supabase
      .from('appointments')
      .select(`
        status,
        created_at
      `)
      .order('created_at', { ascending: true });

    if (error) throw new Error(error.message);

    // Transform data
    const statistics = {
      total: appointments.length,
      byStatus: {},
      monthlyTrends: {}
    };

    // Process appointments
    appointments.forEach(item => {
      // Count by status
      if (!statistics.byStatus[item.status]) {
        statistics.byStatus[item.status] = 0;
      }
      statistics.byStatus[item.status]++;
      
      // Process monthly trends
      const date = new Date(item.created_at);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!statistics.monthlyTrends[monthYear]) {
        statistics.monthlyTrends[monthYear] = {};
      }
      
      if (!statistics.monthlyTrends[monthYear][item.status]) {
        statistics.monthlyTrends[monthYear][item.status] = 0;
      }
      
      statistics.monthlyTrends[monthYear][item.status]++;
    });

    return statistics;
  }

  // Get medical records summary
  async getMedicalRecordsSummary() {
    // Get recent records
    const { data: records, error: recordsError } = await this.supabase
      .from('medical_records')
      .select(`
        id,
        diagnosis,
        treatment_plan,
        record_date,
        patients (
          id,
          user_id,
          users (
            name
          )
        ),
        doctors (
          id,
          user_id,
          users (
            name
          )
        )
      `)
      .order('record_date', { ascending: false })
      .limit(10); // Get the 10 most recent records

    if (recordsError) throw new Error(recordsError.message);

    // Get total count
    const { data: totalCountData, error: countError } = await this.supabase
      .from('medical_records')
      .select(`
        id
      `);

    if (countError) throw new Error(countError.message);

    // Get all records to calculate diagnosis distribution
    const { data: allRecords, error: allRecordsError } = await this.supabase
      .from('medical_records')
      .select(`
        diagnosis
      `);

    if (allRecordsError) throw new Error(allRecordsError.message);

    // Calculate diagnosis distribution
    const diagnosisMap = {};
    allRecords.forEach(record => {
      if (record.diagnosis) {
        if (!diagnosisMap[record.diagnosis]) {
          diagnosisMap[record.diagnosis] = 0;
        }
        diagnosisMap[record.diagnosis]++;
      }
    });

    // Convert to array and sort by count
    const topDiagnoses = Object.entries(diagnosisMap)
      .map(([diagnosis, count]) => ({ diagnosis, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 diagnoses

    return {
      total: totalCountData.length,
      recentRecords: records,
      topDiagnoses: topDiagnoses
    };
  }

  // Update user profile picture URL
  async updateUserProfilePicture(userId, profilePictureUrl) {
    const { data, error } = await this.supabase
      .from('users')
      .update({ profile_picture_url: profilePictureUrl })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get user profile picture URL
  async getUserProfilePicture(userId) {
    const { data, error } = await this.supabase
      .from('users')
      .select('profile_picture_url')
      .eq('id', userId)
      .single();

    if (error) throw new Error(error.message);
    return data.profile_picture_url;
  }

  // Delete user profile picture URL
  async deleteUserProfilePicture(userId) {
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

module.exports = Admin;