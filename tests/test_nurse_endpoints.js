// Test script for nurse endpoints
// This script assumes you have a valid nurse token

const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:5000/api';
const NURSE_TOKEN = 'YOUR_NURSE_TOKEN_HERE'; // Replace with actual nurse token

// Headers for authenticated requests
const headers = {
  'Authorization': `Bearer ${NURSE_TOKEN}`,
  'Content-Type': 'application/json'
};

async function testNurseEndpoints() {
  try {
    console.log('Testing Nurse Endpoints...\n');

    // 1. Get all patients
    console.log('1. Getting all patients...');
    const getAllPatientsResponse = await axios.get(
      `${BASE_URL}/nurses/patients`,
      { headers }
    );
    console.log(`Total patients: ${getAllPatientsResponse.data.length}\n`);

    // 2. Get all appointments
    console.log('2. Getting all appointments...');
    const getAllAppointmentsResponse = await axios.get(
      `${BASE_URL}/nurses/appointments`,
      { headers }
    );
    console.log(`Total appointments: ${getAllAppointmentsResponse.data.length}\n`);

    // 3. Add vitals for a patient (assuming patient ID 1 exists)
    console.log('3. Adding vitals for patient 1...');
    const addVitalsResponse = await axios.post(
      `${BASE_URL}/nurses/patients/1/vitals`,
      {
        vital_signs: "BP: 120/80, HR: 72, Temp: 98.6°F"
      },
      { headers }
    );
    console.log('Add vitals response:', addVitalsResponse.data);
    const vitalsId = addVitalsResponse.data.data.id;
    
    // 4. Get patient vitals
    console.log('4. Getting vitals for patient 1...');
    const getVitalsResponse = await axios.get(
      `${BASE_URL}/nurses/patients/1/vitals`,
      { headers }
    );
    console.log(`Total vitals records: ${getVitalsResponse.data.length}\n`);

    // 5. Add care record for a patient
    console.log('5. Adding care record for patient 1...');
    const addCareRecordResponse = await axios.post(
      `${BASE_URL}/nurses/patients/1/care-records`,
      {
        care_details: "Patient is stable and responding well to treatment",
        medication_administered: "Paracetamol 500mg",
        notes: "Patient reports reduced pain levels"
      },
      { headers }
    );
    console.log('Add care record response:', addCareRecordResponse.data);
    const careRecordId = addCareRecordResponse.data.data.id;

    // 6. Get care records for a patient
    console.log('6. Getting care records for patient 1...');
    const getCareRecordsResponse = await axios.get(
      `${BASE_URL}/nurses/patients/1/care-records`,
      { headers }
    );
    console.log(`Total care records: ${getCareRecordsResponse.data.length}\n`);

    // 7. Update care record
    console.log('7. Updating care record...');
    const updateCareRecordResponse = await axios.put(
      `${BASE_URL}/nurses/care-records/${careRecordId}`,
      {
        care_details: "Patient is stable and responding well to treatment",
        medication_administered: "Paracetamol 500mg, Ibuprofen 200mg",
        notes: "Patient reports significantly reduced pain levels"
      },
      { headers }
    );
    console.log('Update care record response:', updateCareRecordResponse.data);

    // 8. Update appointment status (assuming appointment ID 1 exists)
    console.log('8. Updating appointment status...');
    const updateAppointmentStatusResponse = await axios.put(
      `${BASE_URL}/nurses/appointments/1/status`,
      {
        status: "completed"
      },
      { headers }
    );
    console.log('Update appointment status response:', updateAppointmentStatusResponse.data);

    // 9. Delete care record
    console.log('9. Deleting care record...');
    const deleteCareRecordResponse = await axios.delete(
      `${BASE_URL}/nurses/care-records/${careRecordId}`,
      { headers }
    );
    console.log('Delete care record response:', deleteCareRecordResponse.data);

    console.log('All nurse endpoint tests completed successfully!');
    
  } catch (error) {
    console.error('Error during testing:', error.response ? error.response.data : error.message);
  }
}

// Run the tests
testNurseEndpoints();