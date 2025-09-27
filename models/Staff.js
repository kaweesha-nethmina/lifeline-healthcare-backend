class Staff {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Patient check-in (just returns patient info, doesn't update patient record)
  async patientCheckIn(patientId) {
    // Simply get patient information without updating
    const { data, error } = await this.supabase
      .from('patients')
      .select('*')
      .eq('id', patientId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Create check-in record
  async createCheckInRecord(checkInData) {
    const { data, error } = await this.supabase
      .from('check_ins')
      .insert([checkInData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Create payment record
  async createPaymentRecord(paymentData) {
    const { data, error } = await this.supabase
      .from('payments')
      .insert([paymentData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get patient information with check-in history
  async getPatientInfoWithCheckIns(patientId) {
    const { data, error } = await this.supabase
      .from('patients')
      .select(`
        *,
        check_ins (
          id,
          check_in_time,
          department,
          reason_for_visit,
          created_at
        ),
        users (
          name,
          email,
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
      .eq('id', patientId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get patient information (original method)
  async getPatientInfo(patientId) {
    const { data, error } = await this.supabase
      .from('patients')
      .select('*')
      .eq('id', patientId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get all patients
  async getAllPatients() {
    const { data, error } = await this.supabase
      .from('patients')
      .select(`
        *,
        users (
          name,
          email,
          profile_picture_url,
          phone_number,
          date_of_birth,
          gender,
          address,
          emergency_contact
        )
      `)
      .order('id', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  // Get all doctors
  async getAllDoctors() {
    const { data, error } = await this.supabase
      .from('doctors')
      .select(`
        *,
        users (
          name,
          email,
          profile_picture_url,
          phone_number,
          date_of_birth,
          gender,
          address,
          emergency_contact
        )
      `)
      .order('id', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  // Get pending check-ins (patients with confirmed or booked appointments)
  async getPendingCheckIns() {
    const { data, error } = await this.supabase
      .from('appointments')
      .select(`
        id,
        appointment_date,
        status,
        location,
        created_at,
        updated_at,
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
            name,
            email,
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
            name,
            email,
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
      .in('status', ['confirmed', 'booked'])
      .order('appointment_date', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  // Get checked-in patients
  async getCheckedInPatients() {
    const { data, error } = await this.supabase
      .from('check_ins')
      .select(`
        id,
        check_in_time,
        department,
        reason_for_visit,
        created_at,
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
            name,
            email,
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
      .order('check_in_time', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  // Get comprehensive patient details by ID
  async getPatientDetailsById(patientId) {
    const { data, error } = await this.supabase
      .from('patients')
      .select(`
        *,
        users (
          name,
          email,
          profile_picture_url,
          phone_number,
          date_of_birth,
          gender,
          address,
          emergency_contact,
          created_at,
          updated_at
        ),
        check_ins (
          id,
          check_in_time,
          department,
          reason_for_visit,
          created_at
        ),
        appointments (
          id,
          appointment_date,
          status,
          location,
          created_at,
          updated_at,
          doctors (
            id,
            specialty,
            qualification,
            users (
              name
            )
          )
        ),
        medical_records (
          id,
          diagnosis,
          treatment_plan,
          prescriptions,
          record_date,
          updated_at,
          doctors (
            id,
            specialty,
            users (
              name
            )
          )
        ),
        payments (
          id,
          amount,
          payment_method,
          payment_status,
          payment_date,
          created_at
        )
      `)
      .eq('id', patientId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get all payments with patient details
  async getAllPayments() {
    const { data, error } = await this.supabase
      .from('payments')
      .select(`
        id,
        amount,
        payment_method,
        payment_status,
        payment_date,
        created_at,
        updated_at,
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
            name,
            email,
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
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  // Get payment by ID with patient details
  async getPaymentById(paymentId) {
    const { data, error } = await this.supabase
      .from('payments')
      .select(`
        id,
        amount,
        payment_method,
        payment_status,
        payment_date,
        created_at,
        updated_at,
        patient_id,
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
            name,
            email,
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
      .eq('id', paymentId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}

module.exports = Staff;