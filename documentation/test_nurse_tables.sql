-- Test script to verify nurse tables creation and functionality

-- Test 1: Verify nurse_vitals table exists
\d nurse_vitals;

-- Test 2: Verify nurse_care_records table exists
\d nurse_care_records;

-- Test 3: Verify indexes exist
SELECT indexname FROM pg_indexes WHERE tablename = 'nurse_vitals';
SELECT indexname FROM pg_indexes WHERE tablename = 'nurse_care_records';

-- Test 4: Insert test data (assuming you have a patient with id=1 and nurse with id=1)
INSERT INTO nurse_vitals (patient_id, nurse_id, vital_signs) 
VALUES (1, 1, 'BP: 120/80, HR: 72, Temp: 98.6°F');

INSERT INTO nurse_care_records (patient_id, nurse_id, care_details, medication_administered, notes)
VALUES (1, 1, 'Patient is stable', 'Paracetamol 500mg', 'Patient reports reduced pain');

-- Test 5: Query test data
SELECT * FROM nurse_vitals WHERE patient_id = 1;
SELECT * FROM nurse_care_records WHERE patient_id = 1;

-- Test 6: Update test data
UPDATE nurse_care_records 
SET medication_administered = 'Paracetamol 500mg, Ibuprofen 200mg', 
    notes = 'Patient reports significantly reduced pain'
WHERE patient_id = 1 AND nurse_id = 1;

-- Test 7: Verify update
SELECT * FROM nurse_care_records WHERE patient_id = 1;

-- Test 8: Delete test data
DELETE FROM nurse_vitals WHERE patient_id = 1 AND nurse_id = 1;
DELETE FROM nurse_care_records WHERE patient_id = 1 AND nurse_id = 1;

-- Test 9: Verify deletion
SELECT COUNT(*) FROM nurse_vitals WHERE patient_id = 1;
SELECT COUNT(*) FROM nurse_care_records WHERE patient_id = 1;

-- Clean up: Drop tables (only for testing purposes)
-- DROP TABLE IF EXISTS nurse_care_records;
-- DROP TABLE IF EXISTS nurse_vitals;