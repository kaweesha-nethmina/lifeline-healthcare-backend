const supabase = require('../db');

// Check if a patient exists
const patientExists = async (patientId) => {
  const { data, error } = await supabase
    .from('patients')
    .select('id')
    .eq('id', patientId)
    .single();

  if (error) return false;
  return !!data;
};

// Check if a doctor exists
const doctorExists = async (doctorId) => {
  const { data, error } = await supabase
    .from('doctors')
    .select('id')
    .eq('id', doctorId)
    .single();

  if (error) return false;
  return !!data;
};

// Check if an insurance provider exists (user with role 'provider')
const insuranceProviderExists = async (providerId) => {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', providerId)
    .eq('role', 'provider')
    .single();

  if (error) return false;
  return !!data;
};

// Check if an emergency resource exists
const emergencyResourceExists = async (resourceId) => {
  const { data, error } = await supabase
    .from('emergency_resources')
    .select('id')
    .eq('id', resourceId)
    .single();

  if (error) return false;
  return !!data;
};

// Check if a medical record exists
const medicalRecordExists = async (recordId) => {
  const { data, error } = await supabase
    .from('medical_records')
    .select('id')
    .eq('id', recordId)
    .single();

  if (error) return false;
  return !!data;
};

module.exports = {
  patientExists,
  doctorExists,
  insuranceProviderExists,
  emergencyResourceExists,
  medicalRecordExists
};