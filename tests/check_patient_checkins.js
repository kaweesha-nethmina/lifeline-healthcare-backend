// Script to check if patient ID 2 has any check-in records
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with your credentials
const supabaseUrl = process.env.SUPABASE_URL || 'https://vmvrdwueiohofhijsixa.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtdnJkd3VlaW9ob2ZoaWpzaXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDU3NzYsImV4cCI6MjA3NjAyMTc3Nn0.R6LJAkoQm9Nf-NsrV1_zegNOuXWOW-QgYKux7FyI-sw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPatientCheckIns() {
  try {
    console.log('Checking check-in records for patient ID 2...');
    
    // Get patient information with check-in history
    const { data, error } = await supabase
      .from('patients')
      .select(`
        *,
        check_ins (
          id,
          check_in_time,
          department,
          reason_for_visit,
          created_at
        )
      `)
      .eq('id', 2)
      .single();

    if (error) {
      console.log('Error fetching patient:', error);
      return;
    }
    
    console.log('Patient with check-in history:', JSON.stringify(data, null, 2));
    
  } catch (err) {
    console.log('Error:', err);
  }
}

checkPatientCheckIns();