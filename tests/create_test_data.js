const supabase = require('./db');

async function createTestData() {
  try {
    // First, let's check if we have a patient and doctor in the system
    const { data: patients, error: patientError } = await supabase
      .from('patients')
      .select('*')
      .limit(1);
      
    if (patientError) {
      console.log('Error fetching patients:', patientError);
      return;
    }
    
    const { data: doctors, error: doctorError } = await supabase
      .from('doctors')
      .select('*')
      .limit(1);
      
    if (doctorError) {
      console.log('Error fetching doctors:', doctorError);
      return;
    }
    
    if (patients.length === 0 || doctors.length === 0) {
      console.log('No patients or doctors found in the database. Please create some users first.');
      return;
    }
    
    const patient = patients[0];
    const doctor = doctors[0];
    
    console.log('Creating appointment for patient ID:', patient.id, 'and doctor ID:', doctor.id);
    
    // Create an appointment
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .insert([
        {
          patient_id: patient.id,
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
    
    // Also create a medical record for testing
    const { data: medicalRecord, error: recordError } = await supabase
      .from('medical_records')
      .insert([
        {
          patient_id: patient.id,
          doctor_id: doctor.id,
          diagnosis: 'Routine checkup',
          treatment_plan: 'Regular monitoring',
          prescriptions: 'Vitamin supplements'
        }
      ])
      .select()
      .single();
      
    if (recordError) {
      console.log('Error creating medical record:', recordError);
      return;
    }
    
    console.log('Medical record created successfully:', medicalRecord);
    
  } catch (err) {
    console.log('Error:', err);
  }
}

createTestData();