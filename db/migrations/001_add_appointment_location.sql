-- Migration script to add location column to appointments table
-- This script should be run to update the database schema

-- Add location column to appointments table
ALTER TABLE appointments ADD COLUMN location TEXT;

-- Add a comment to describe the purpose of the column
COMMENT ON COLUMN appointments.location IS 'Location of the appointment (e.g., hospital, clinic name)';