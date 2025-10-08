// Test script to verify doctor access to patient records
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with your credentials
const supabaseUrl = process.env.SUPABASE_URL || 'https://vmvrdwueiohofhijsixa.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtdnJkd3VlaW9ob2ZoaWpzaXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDU3NzYsImV4cCI6MjA3NjAyMTc3Nn0.R6LJAkoQm9Nf-NsrV1_zegNOuXWOW-QgYKux7FyI-sw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDoctorAccess() {
  try {
    const patientId = 2;  // The patient we're testing with
    const doctorUserId = 6;  // The user_id of the doctor (from JWT)
    
    console.log(`Testing access for doctor (user_id: ${doctorUserId}) to patient (id: ${patientId})`);
    
    // First, get the doctor's ID from the doctors table
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', doctorUserId)
      .single();
      
    if (doctorError) {
      console.log('Error fetching doctor:', doctorError);
      return;
    }
    
    if (!doctor) {
      console.log('Doctor not found');
      return;
    }
    
    console.log('Doctor record found:', doctor);
    
    // Verify that the patient has an appointment with this doctor
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', patientId)
      .eq('doctor_id', doctor.id)
      .neq('status', 'cancelled');
      
    if (appointmentError) {
      console.log('Error checking appointment:', appointmentError);
      return;
    }
    
    console.log('Appointment check result:', appointment);
    
    if (!appointment || appointment.length === 0) {
      console.log('No appointment found');
      
      // Let's check what appointments exist for this patient
      const { data: allAppointments, error: allAppointmentError } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', patientId);
        
      if (allAppointmentError) {
        console.log('Error fetching all appointments:', allAppointmentError);
        return;
      }
      
      console.log('All appointments for patient:', allAppointments);
      
      // Let's also check what doctor this appointment is linked to
      const appointmentDoctorId = allAppointments[0].doctor_id;
      console.log('Appointment doctor ID:', appointmentDoctorId);
      
      const { data: appointmentDoctor, error: appointmentDoctorError } = await supabase
        .from('doctors')
        .select('user_id')
        .eq('id', appointmentDoctorId)
        .single();
        
      if (appointmentDoctorError) {
        console.log('Error fetching appointment doctor:', appointmentDoctorError);
        return;
      }
      
      console.log('Appointment doctor user_id:', appointmentDoctor.user_id);
    } else {
      console.log('Appointment found:', appointment);
      console.log('Doctor has access to patient records');
    }
    
  } catch (err) {
    console.log('Error:', err);
  }
}

testDoctorAccess();