const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with fallback for development
const supabaseUrl = process.env.SUPABASE_URL || 'http://localhost:54321';
const supabaseKey = process.env.SUPABASE_KEY || 'your-super-secret-jwt-token-with-at-least-32-characters-long';

// Only create client if we have valid credentials
let supabase;
if (supabaseUrl && supabaseUrl !== 'your_supabase_url' && 
    supabaseKey && supabaseKey !== 'your_supabase_key') {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    supabase = {
      from: () => ({
        select: () => Promise.resolve({ data: null, error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
        eq: () => Promise.resolve({ data: null, error: null }),
        single: () => Promise.resolve({ data: null, error: null }),
        order: () => Promise.resolve({ data: null, error: null }),
      })
    };
  }
} else {
  console.warn('Supabase credentials not configured. Database operations will not work.');
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: null, error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
      eq: () => Promise.resolve({ data: null, error: null }),
      single: () => Promise.resolve({ data: null, error: null }),
      order: () => Promise.resolve({ data: null, error: null }),
    })
  };
}

module.exports = supabase;