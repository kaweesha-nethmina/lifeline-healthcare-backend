# New User Fields Implementation

This document describes the implementation of new patient profile fields in the users table and their integration across the application.

## Overview

New fields have been added to the `users` table to store patient profile information directly:
- `phone_number` - User contact phone number
- `date_of_birth` - User date of birth
- `gender` - User gender
- `address` - User residential address
- `emergency_contact` - Emergency contact information

These fields are synchronized between the `users` table and role-specific tables (`patients`, `doctors`) when profiles are updated.

## Database Changes

### Migration Script
```sql
-- Add patient profile fields to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(15),
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS gender VARCHAR(20),
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact VARCHAR(255);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Add comments to describe the new columns
COMMENT ON COLUMN users.phone_number IS 'User contact phone number';
COMMENT ON COLUMN users.date_of_birth IS 'User date of birth';
COMMENT ON COLUMN users.gender IS 'User gender';
COMMENT ON COLUMN users.address IS 'User residential address';
COMMENT ON COLUMN users.emergency_contact IS 'Emergency contact information';
```

## Implementation Details

### 1. Patient Profile Endpoints

#### Get Patient Profile
- **Endpoint:** `GET /patients/profile`
- Returns patient data with embedded user details including the new fields
- Both patient-specific and user-level fields are included in the response

#### Update Patient Profile
- **Endpoint:** `PUT /patients/profile`
- Updates both the `patients` table and the `users` table
- Synchronizes the following fields between tables:
  - `phone_number`
  - `date_of_birth`
  - `gender`
  - `address`
  - `emergency_contact`
- Returns both patient and user data in the response

### 2. Doctor Profile Endpoints

#### Get Doctor Profile
- **Endpoint:** `GET /doctors/profile`
- Returns doctor data with embedded user details including the new fields
- Both doctor-specific and user-level fields are included in the response

#### Update Doctor Profile
- **Endpoint:** `PUT /doctors/profile`
- Updates both the `doctors` table and the `users` table
- Synchronizes the following fields between tables:
  - `phone_number`
  - `date_of_birth`
  - `gender`
  - `address`
  - `emergency_contact`
- Returns both doctor and user data in the response

### 3. General User Profile Endpoints

#### Get User Profile
- **Endpoint:** `GET /users/profile`
- Returns user data including the new fields directly from the `users` table

#### Update User Profile
- **Endpoint:** `PUT /users/profile`
- Updates the `users` table with provided fields
- Excludes protected fields: `id`, `email`, `password`, `role`, `created_at`

## Data Synchronization

When updating role-specific profiles:
1. Role-specific data is updated in the corresponding table (`patients`, `doctors`)
2. Common profile fields are synchronized to the `users` table
3. Both operations are performed in a single request
4. Errors in user table updates are logged but don't prevent the main operation

## API Response Structure

### Patient Profile Response
```json
{
  "id": 1,
  "user_id": 1,
  "date_of_birth": "1990-01-15",
  "gender": "Male",
  "phone_number": "+1234567890",
  "address": "123 Main St, City, Country",
  "insurance_details": "Insurance Co, Policy #12345",
  "medical_history": "Allergies: Penicillin, Conditions: Hypertension",
  "emergency_contact": "Jane Doe: +1234567891",
  "preferred_location": "Downtown Medical Center",
  "created_at": "2025-10-14T10:00:00Z",
  "updated_at": "2025-10-14T10:00:00Z",
  "user": {
    "id": 1,
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "patient",
    "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_1_1234567890.jpg",
    "phone_number": "+1234567890",
    "date_of_birth": "1990-01-15",
    "gender": "Male",
    "address": "123 Main St, City, Country",
    "emergency_contact": "Jane Doe: +1234567891",
    "created_at": "2025-10-14T10:00:00Z",
    "updated_at": "2025-10-14T10:00:00Z"
  }
}
```

### Update Response
```json
{
  "message": "Profile updated successfully",
  "patientData": {
    // Patient-specific fields
  },
  "userData": {
    // User-level fields including new fields
  }
}
```

## Security Considerations

1. All profile updates require authentication
2. Users can only update their own profiles
3. Admin users have elevated privileges
4. Protected fields cannot be updated through the API
5. Data validation is performed on all input fields

## Testing

The implementation has been tested to ensure:
1. New fields are properly stored and retrieved
2. Data synchronization between tables works correctly
3. API responses include all expected fields
4. Error handling works properly
5. Performance is acceptable with the new indexes