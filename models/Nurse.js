class Nurse {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Get all patients
  async getAllPatients() {
    const { data, error } = await this.supabase
      .from('patients')
      .select(`
        *,
        users (
          name,
          email
        )
      `)
      .order('id', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  // Get all appointments
  async getAllAppointments() {
    const { data, error } = await this.supabase
      .from('appointments')
      .select(`
        *,
        patients (
          user_id
        ),
        doctors (
          user_id
        )
      `)
      .order('appointment_date', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  // Update appointment status
  async updateAppointmentStatus(appointmentId, status) {
    const { data, error } = await this.supabase
      .from('appointments')
      .update({ status, updated_at: new Date() })
      .eq('id', appointmentId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Add vitals for a patient
  async addVitals(patientId, nurseId, vitalSigns) {
    const { data, error } = await this.supabase
      .from('nurse_vitals')
      .insert([
        {
          patient_id: patientId,
          nurse_id: nurseId,
          vital_signs: vitalSigns,
          recorded_at: new Date()
        }
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get vitals for a patient
  async getPatientVitals(patientId) {
    const { data, error } = await this.supabase
      .from('nurse_vitals')
      .select('*')
      .eq('patient_id', patientId)
      .order('recorded_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  // Add care record for a patient
  async addCareRecord(patientId, nurseId, careData) {
    const { data, error } = await this.supabase
      .from('nurse_care_records')
      .insert([
        {
          patient_id: patientId,
          nurse_id: nurseId,
          care_details: careData.care_details,
          medication_administered: careData.medication_administered,
          notes: careData.notes,
          recorded_at: new Date()
        }
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get care records for a patient
  async getCareRecords(patientId) {
    const { data, error } = await this.supabase
      .from('nurse_care_records')
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

  // Update a care record
  async updateCareRecord(recordId, updateData) {
    const { data, error } = await this.supabase
      .from('nurse_care_records')
      .update({
        ...updateData,
        updated_at: new Date()
      })
      .eq('id', recordId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Delete a care record
  async deleteCareRecord(recordId) {
    const { data, error } = await this.supabase
      .from('nurse_care_records')
      .delete()
      .eq('id', recordId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get medical records for a patient
  async getPatientMedicalRecords(patientId) {
    const { data, error } = await this.supabase
      .from('medical_records')
      .select(`
        *,
        doctors (
          user_id,
          users (
            name
          )
        )
      `)
      .eq('patient_id', patientId)
      .order('record_date', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }
}

module.exports = Nurse;