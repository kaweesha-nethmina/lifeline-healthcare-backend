class Payment {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Process payment
  async processPayment(paymentData) {
    const { data, error } = await this.supabase
      .from('payments')
      .insert([paymentData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Update payment status
  async updatePaymentStatus(paymentId, status) {
    const { data, error } = await this.supabase
      .from('payments')
      .update({ payment_status: status })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Get payment history for a patient
  async getPaymentHistory(patientId) {
    const { data, error } = await this.supabase
      .from('payments')
      .select('*')
      .eq('patient_id', patientId)
      .order('payment_date', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  // Get payment by ID
  async getPaymentById(paymentId) {
    const { data, error } = await this.supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}

module.exports = Payment;