// Script to check if there are any users with the "provider" role
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with your credentials
const supabaseUrl = process.env.SUPABASE_URL || 'https://vmvrdwueiohofhijsixa.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtdnJkd3VlaW9ob2ZoaWpzaXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDU3NzYsImV4cCI6MjA3NjAyMTc3Nn0.R6LJAkoQm9Nf-NsrV1_zegNOuXWOW-QgYKux7FyI-sw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProviderUsers() {
  try {
    console.log('Checking for users with role "provider"...');
    
    // Get all users with role 'provider'
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'provider');

    if (error) {
      console.log('Error fetching providers:', error);
      return;
    }
    
    console.log('Providers found:', data);
    
  } catch (err) {
    console.log('Error:', err);
  }
}

checkProviderUsers();