// Script to create an appointment for doctor (user_id: 11) and patient ID 2
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with your credentials
const supabaseUrl = process.env.SUPABASE_URL || 'https://vmvrdwueiohofhijsixa.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtdnJkd3VlaW9ob2ZoaWpzaXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDU3NzYsImV4cCI6MjA3NjAyMTc3Nn0.R6LJAkoQm9Nf-NsrV1_zegNOuXWOW-QgYKux7FyI-sw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAppointment() {
  try {
    console.log('Creating appointment for doctor (user_id: 11) and patient ID 2...');
    
    // Get the doctor with user_id 11
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', 11)
      .single();
      
    if (doctorError) {
      console.log('Error fetching doctor:', doctorError);
      return;
    }
    
    if (!doctor) {
      console.log('Doctor not found');
      return;
    }
    
    console.log('Doctor found with id:', doctor.id);
    
    // Create an appointment
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .insert([
        {
          patient_id: 2,
          doctor_id: doctor.id,
          appointment_date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
          status: 'booked'
        }
      ])
      .select()
      .single();
      
    if (appointmentError) {
      console.log('Error creating appointment:', appointmentError);
      return;
    }
    
    console.log('Appointment created successfully:', appointment);
    
  } catch (err) {
    console.log('Error:', err);
  }
}

createAppointment();