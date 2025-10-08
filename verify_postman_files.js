const fs = require('fs');
const path = require('path');

// Create test_data directory if it doesn't exist
const testDir = path.join(__dirname, 'test_data');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir);
  console.log('Created test_data directory');
}

// List of expected JSON files
const expectedFiles = [
  'register_user.json',
  'login_user.json',
  'update_patient_profile.json',
  'book_appointment.json',
  'update_doctor_profile.json',
  'create_medical_record.json',
  'create_user.json',
  'configure_system.json',
  'log_emergency_case.json',
  'update_emergency_case.json',
  'process_payment.json',
  'verify_insurance.json',
  'process_insurance_claim.json'
];

console.log('🔍 Verifying Postman test data files...\n');

let allExist = true;

expectedFiles.forEach(file => {
  const filePath = path.join(testDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} (missing)`);
    allExist = false;
  }
});

console.log('\n📁 Checking Postman collection files...');

const collectionFiles = [
  'Lifeline_Healthcare_API.postman_collection.json',
  'Lifeline_Healthcare_Environment.postman_environment.json'
];

collectionFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} (missing)`);
    allExist = false;
  }
});

if (allExist) {
  console.log('\n🎉 All Postman test files are ready!');
  console.log('\n📥 To use with Postman:');
  console.log('   1. Import the collection file');
  console.log('   2. Import the environment file');
  console.log('   3. Start testing the API endpoints');
} else {
  console.log('\n❌ Some files are missing. Please check the file structure.');
}