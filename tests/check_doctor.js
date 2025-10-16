// Script to check if doctor with user_id 11 exists
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with your credentials
const supabaseUrl = process.env.SUPABASE_URL || 'https://vmvrdwueiohofhijsixa.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtdnJkd3VlaW9ob2ZoaWpzaXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDU3NzYsImV4cCI6MjA3NjAyMTc3Nn0.R6LJAkoQm9Nf-NsrV1_zegNOuXWOW-QgYKux7FyI-sw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDoctor() {
  try {
    console.log('Checking if doctor with user_id 11 exists...');
    
    // Check if there's a doctor with user_id 11
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('*')
      .eq('user_id', 11)
      .single();
      
    if (doctorError) {
      console.log('Error fetching doctor:', doctorError);
      return;
    }
    
    if (!doctor) {
      console.log('No doctor found with user_id 11');
      return;
    }
    
    console.log('Doctor found:', doctor);
    
    // Check if there are any appointments for this doctor with patient ID 2
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
      console.log('No appointments found for patient ID 2 with this doctor');
    }
    
  } catch (err) {
    console.log('Error:', err);
  }
}

checkDoctor();