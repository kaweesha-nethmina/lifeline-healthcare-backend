class Prescription {
  constructor(supabase) {
    this.supabase = supabase;
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
}

module.exports = Prescription;