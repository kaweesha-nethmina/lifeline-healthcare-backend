// Simple script to check appointments in the database
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with your credentials
const supabaseUrl = process.env.SUPABASE_URL || 'https://vmvrdwueiohofhijsixa.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtdnJkd3VlaW9ob2ZoaWpzaXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDU3NzYsImV4cCI6MjA3NjAyMTc3Nn0.R6LJAkoQm9Nf-NsrV1_zegNOuXWOW-QgYKux7FyI-sw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAppointments() {
  try {
    console.log('Checking appointments for patient ID 2...');
    
    // First, let's get the doctor information from the JWT token
    // For this test, we'll need to find a doctor in the system
    const { data: doctors, error: doctorError } = await supabase
      .from('doctors')
      .select('*')
      .limit(1);
      
    if (doctorError) {
      console.log('Error fetching doctors:', doctorError);
      return;
    }
    
    if (doctors.length === 0) {
      console.log('No doctors found in the database');
      return;
    }
    
    const doctor = doctors[0];
    console.log('Doctor found:', doctor);
    
    // Check if there's an appointment for patient ID 2 with this doctor
    const { data: appointments, error: appointmentError } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', 2)
      .eq('doctor_id', doctor.id);
      
    if (appointmentError) {
      console.log('Error fetching appointments:', appointmentError);
      return;
    }
    
    console.log('Appointments found:', appointments);
    
    if (appointments.length === 0) {
      console.log('No appointments found for patient ID 2 with doctor ID', doctor.id);
      
      // Let's check all appointments for patient ID 2
      const { data: allAppointments, error: allAppointmentError } = await supabase
        .from('appointments')
        .select(`
          *,
          doctors (
            id,
            user_id
          )
        `)
        .eq('patient_id', 2);
        
      if (allAppointmentError) {
        console.log('Error fetching all appointments:', allAppointmentError);
        return;
      }
      
      console.log('All appointments for patient ID 2:', allAppointments);
    }
    
    // Also check if patient ID 2 exists
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('*')
      .eq('id', 2)
      .single();
      
    if (patientError) {
      console.log('Error fetching patient:', patientError);
      return;
    }
    
    console.log('Patient with ID 2:', patient);
    
  } catch (err) {
    console.log('Error:', err);
  }
}

checkAppointments();