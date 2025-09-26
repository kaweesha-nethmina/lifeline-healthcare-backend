class MedicalRecord {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Get a specific medical record by ID
  async getMedicalRecordById(recordId) {
    const { data, error } = await this.supabase
      .from('medical_records')
      .select(`
        *,
        doctors (
          user_id
        ),
        patients (
          user_id
        )
      `)
      .eq('id', recordId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Update a medical record
  async updateMedicalRecord(id, updateData) {
    const { data, error } = await this.supabase
      .from('medical_records')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Delete a medical record
  async deleteMedicalRecord(id) {
    const { data, error } = await this.supabase
      .from('medical_records')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get all prescriptions for a medical record
  async getPrescriptionsByMedicalRecord(medicalRecordId) {
    const { data, error } = await this.supabase
      .from('e_prescriptions')
      .select('*')
      .eq('medical_record_id', medicalRecordId);

    if (error) throw new Error(error.message);
    return data;
  }

  // Create a new prescription
  async createPrescription(prescriptionData) {
    const { data, error } = await this.supabase
      .from('e_prescriptions')
      .insert([prescriptionData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Update a prescription
  async updatePrescription(id, updateData) {
    const { data, error } = await this.supabase
      .from('e_prescriptions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Delete a prescription
  async deletePrescription(id) {
    const { data, error } = await this.supabase
      .from('e_prescriptions')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Delete all prescriptions for a medical record
  async deletePrescriptionByMedicalRecord(medicalRecordId) {
    const { data, error } = await this.supabase
      .from('e_prescriptions')
      .delete()
      .eq('medical_record_id', medicalRecordId);

    if (error) throw new Error(error.message);
    return data;
  }
}

module.exports = MedicalRecord;