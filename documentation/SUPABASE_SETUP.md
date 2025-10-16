# Supabase Setup Guide

## Overview

To fully use this application, you need to set up a Supabase project and configure the environment variables.

## Steps to Set Up Supabase:

1. Go to [Supabase](https://supabase.io/) and create a free account
2. Create a new project
3. Once the project is created, navigate to the project settings
4. Find your project URL and service role key in the API settings
5. Update your `.env` file with these values:

```
SUPABASE_URL=your_actual_supabase_project_url
SUPABASE_KEY=your_actual_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Database Tables

Run the following SQL commands in your Supabase SQL editor to create the required tables:

```sql
-- Create table for Users (General table for both patients and hospital staff)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,  -- 'patient', 'doctor', 'nurse', 'staff', 'admin', etc.
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Patients
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE,
    gender VARCHAR(20),
    phone_number VARCHAR(15),
    address TEXT,
    insurance_details TEXT,  -- Link to insurance provider
    medical_history TEXT,
    emergency_contact VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Doctors
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    specialty VARCHAR(255),
    qualification VARCHAR(255),
    schedule TEXT,  -- Store the doctor's weekly schedule (e.g., JSON or string format)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Appointments
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
    appointment_date TIMESTAMPTZ NOT NULL,
    status VARCHAR(50) DEFAULT 'booked',  -- 'booked', 'rescheduled', 'cancelled', 'completed'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Medical Records
CREATE TABLE medical_records (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
    diagnosis TEXT,
    treatment_plan TEXT,
    prescriptions TEXT,  -- Can store e-prescriptions (link to pharmacies)
    record_date TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for E-prescriptions
CREATE TABLE e_prescriptions (
    id SERIAL PRIMARY KEY,
    medical_record_id INTEGER REFERENCES medical_records(id) ON DELETE CASCADE,
    medication VARCHAR(255),
    dosage VARCHAR(255),
    pharmacy_id INTEGER,  -- Link to Pharmacy
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Payments
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),  -- 'cash', 'insurance', 'credit', etc.
    payment_status VARCHAR(50) DEFAULT 'pending',  -- 'pending', 'completed', 'failed'
    payment_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Emergency Resources (Beds, equipment, staff)
CREATE TABLE emergency_resources (
    id SERIAL PRIMARY KEY,
    resource_type VARCHAR(50),  -- 'bed', 'equipment', 'staff'
    status VARCHAR(50),  -- 'available', 'in-use', 'under-maintenance'
    location VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Emergency Cases (Link to resource management)
CREATE TABLE emergency_cases (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    case_status VARCHAR(50),  -- 'waiting', 'triage', 'under-care', etc.
    emergency_type VARCHAR(50),  -- 'ambulance', 'walk-in'
    resource_id INTEGER REFERENCES emergency_resources(id) ON DELETE CASCADE,  -- Linking the resource used (e.g., bed, staff)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Notifications (e.g., Appointment reminders, emergency alerts)
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    notification_type VARCHAR(50),  -- 'appointment', 'emergency', 'payment', etc.
    status VARCHAR(50) DEFAULT 'unread',  -- 'unread', 'read'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Insurance Providers (For integrating with external insurance systems)
CREATE TABLE insurance_providers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_info TEXT,
    coverage_details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Insurance Claims (For processing insurance claims)
CREATE TABLE insurance_claims (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    insurance_provider_id INTEGER REFERENCES insurance_providers(id) ON DELETE CASCADE,
    claim_status VARCHAR(50),  -- 'pending', 'approved', 'rejected'
    claim_amount DECIMAL(10, 2),
    claim_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for System Logs (For system administration)
CREATE TABLE system_logs (
    id SERIAL PRIMARY KEY,
    activity VARCHAR(255) NOT NULL,
    details TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Backups (For system administration)
CREATE TABLE backups (
    id SERIAL PRIMARY KEY,
    backup_name VARCHAR(255) NOT NULL,
    backup_type VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for Check-ins (For hospital staff)
CREATE TABLE check_ins (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    check_in_time TIMESTAMPTZ DEFAULT NOW(),
    department VARCHAR(255),
    reason_for_visit TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Additional Setup Steps

### 1. Enable Row Level Security (Optional)
For production environments, you may want to enable Row Level Security (RLS) on your tables to control access at the database level.

### 2. Create Database Functions (Optional)
You can create custom PostgreSQL functions for complex operations or data validation.

### 3. Set up Realtime Subscriptions (Optional)
If you want to implement real-time features, you can enable realtime subscriptions on specific tables.

## Testing the Connection

After setting up your Supabase project and updating the `.env` file:

1. Start the server: `npm run dev`
2. The application should connect to your Supabase database
3. Test the connection by registering a new user through the API

## Troubleshooting

### Connection Issues
1. Verify that your `SUPABASE_URL` and `SUPABASE_KEY` are correct
2. Ensure that your Supabase project is not paused
3. Check that you have network connectivity to Supabase

### Authentication Issues
1. Verify that your `JWT_SECRET` matches the one used to generate tokens
2. Check that the token expiration time is set correctly

### Database Errors
1. Ensure all tables have been created with the correct schema
2. Verify that foreign key relationships are properly defined
3. Check that you have the necessary permissions to access the database

## Best Practices

1. Use environment variables for all sensitive configuration
2. Regularly rotate your Supabase service role key
3. Enable database backups in Supabase
4. Monitor your database performance and usage
5. Use connection pooling for better performance
6. Implement proper error handling for database operations