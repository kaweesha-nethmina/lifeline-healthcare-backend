# Database Schema Updates

## Overview
This document contains the SQL commands to update the database schema with missing tables for nurse functionality.

## Nurse Vitals Table
```sql
-- Create table for Nurse Vitals (for recording patient vital signs)
CREATE TABLE nurse_vitals (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    nurse_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    vital_signs TEXT,  -- e.g., "BP: 120/80, HR: 72, Temp: 98.6°F"
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Nurse Care Records Table
```sql
-- Create table for Nurse Care Records (for detailed patient care documentation)
CREATE TABLE nurse_care_records (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    nurse_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    care_details TEXT,
    medication_administered TEXT,
    notes TEXT,
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Indexes for Performance
```sql
-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_nurse_vitals_patient_id ON nurse_vitals(patient_id);
CREATE INDEX IF NOT EXISTS idx_nurse_vitals_nurse_id ON nurse_vitals(nurse_id);
CREATE INDEX IF NOT EXISTS idx_nurse_vitals_recorded_at ON nurse_vitals(recorded_at);

CREATE INDEX IF NOT EXISTS idx_nurse_care_records_patient_id ON nurse_care_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_nurse_care_records_nurse_id ON nurse_care_records(nurse_id);
CREATE INDEX IF NOT EXISTS idx_nurse_care_records_recorded_at ON nurse_care_records(recorded_at);
```

## Comments for Documentation
```sql
-- Add comments to describe the new tables and columns
COMMENT ON TABLE nurse_vitals IS 'Stores patient vital signs recorded by nurses';
COMMENT ON COLUMN nurse_vitals.patient_id IS 'Reference to the patient';
COMMENT ON COLUMN nurse_vitals.nurse_id IS 'Reference to the nurse who recorded the vitals';
COMMENT ON COLUMN nurse_vitals.vital_signs IS 'Vital signs data as text (e.g., BP, HR, Temperature)';
COMMENT ON COLUMN nurse_vitals.recorded_at IS 'Timestamp when vitals were recorded';

COMMENT ON TABLE nurse_care_records IS 'Stores detailed care records for patients documented by nurses';
COMMENT ON COLUMN nurse_care_records.patient_id IS 'Reference to the patient';
COMMENT ON COLUMN nurse_care_records.nurse_id IS 'Reference to the nurse who created the care record';
COMMENT ON COLUMN nurse_care_records.care_details IS 'Detailed care information';
COMMENT ON COLUMN nurse_care_records.medication_administered IS 'Medications given to the patient';
COMMENT ON COLUMN nurse_care_records.notes IS 'Additional notes from the nurse';
COMMENT ON COLUMN nurse_care_records.recorded_at IS 'Timestamp when care was documented';
```