class HealthcareManager {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Get healthcare analytics data
  async getAnalyticsData() {
    // Get appointment statistics
    const { data: appointments, error: appointmentError } = await this.supabase
      .from('appointments')
      .select('*');
    
    if (appointmentError) throw new Error(appointmentError.message);

    // Get payment statistics
    const { data: payments, error: paymentError } = await this.supabase
      .from('payments')
      .select('*');
    
    if (paymentError) throw new Error(paymentError.message);

    // Get patient statistics
    const { data: patients, error: patientError } = await this.supabase
      .from('patients')
      .select('*');
    
    if (patientError) throw new Error(patientError.message);

    return {
      appointments: appointments.length,
      payments: payments.length,
      patients: patients.length,
      totalRevenue: payments.reduce((sum, payment) => sum + (payment.amount || 0), 0)
    };
  }

  // Get resource utilization data
  async getResourceUtilization() {
    const { data: resources, error } = await this.supabase
      .from('emergency_resources')
      .select('*');
    
    if (error) throw new Error(error.message);

    return resources;
  }
}

module.exports = HealthcareManager;