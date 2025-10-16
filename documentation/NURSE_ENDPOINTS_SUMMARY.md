# Nurse Endpoints Summary

## Overview
This document summarizes all the endpoints that need to be implemented for nurse functionality in the Lifeline Smart Healthcare System.

## Required Nurse Functionality

### 1. Patient Management
Nurses need to:
- See all patients in the system

### 2. Appointment Management
Nurses need to:
- See all appointments
- Update appointment status

### 3. Vitals Management
Nurses need to:
- Add vitals (vital signs) for patients
- Retrieve vitals history of patients

### 4. Care Records Management
Nurses need to:
- Add care records
- Retrieve care records
- Update care records
- Delete care records

## Endpoint Specifications

### Patient Management Endpoints

#### Get All Patients
- **Method**: GET
- **URL**: `/nurses/patients`
- **Description**: Retrieve all patients in the system
- **Authentication**: Required (Nurse)
- **Response**: 
  - 200: Array of patient objects with user details
  - 401: Unauthorized
  - 500: Server error

### Appointment Management Endpoints

#### Get All Appointments
- **Method**: GET
- **URL**: `/nurses/appointments`
- **Description**: Retrieve all appointments in the system
- **Authentication**: Required (Nurse)
- **Response**: 
  - 200: Array of appointment objects
  - 401: Unauthorized
  - 500: Server error

#### Update Appointment Status
- **Method**: PUT
- **URL**: `/nurses/appointments/:id/status`
- **Description**: Update the status of an appointment
- **Authentication**: Required (Nurse)
- **Parameters**: 
  - id (path): Appointment ID
- **Request Body**:
  ```json
  {
    "status": "completed" // or "booked", "rescheduled", "cancelled"
  }
  ```
- **Response**: 
  - 200: Updated appointment object
  - 400: Bad request (invalid status)
  - 401: Unauthorized
  - 404: Appointment not found
  - 500: Server error

### Vitals Management Endpoints

#### Add Vitals
- **Method**: POST
- **URL**: `/nurses/patients/:id/vitals`
- **Description**: Add vital signs for a patient
- **Authentication**: Required (Nurse)
- **Parameters**: 
  - id (path): Patient ID
- **Request Body**:
  ```json
  {
    "vital_signs": "BP: 120/80, HR: 72, Temp: 98.6°F"
  }
  ```
- **Response**: 
  - 201: Created vitals record
  - 400: Bad request (missing data)
  - 401: Unauthorized
  - 404: Patient not found
  - 500: Server error

#### Get Patient Vitals
- **Method**: GET
- **URL**: `/nurses/patients/:id/vitals`
- **Description**: Retrieve vital signs history for a patient
- **Authentication**: Required (Nurse)
- **Parameters**: 
  - id (path): Patient ID
- **Response**: 
  - 200: Array of vitals records
  - 401: Unauthorized
  - 404: Patient not found
  - 500: Server error

### Care Records Management Endpoints

#### Add Care Record
- **Method**: POST
- **URL**: `/nurses/patients/:id/care-records`
- **Description**: Add a care record for a patient
- **Authentication**: Required (Nurse)
- **Parameters**: 
  - id (path): Patient ID
- **Request Body**:
  ```json
  {
    "care_details": "Patient is stable and responding well to treatment",
    "medication_administered": "Paracetamol 500mg",
    "notes": "Patient reports reduced pain levels"
  }
  ```
- **Response**: 
  - 201: Created care record
  - 400: Bad request (missing data)
  - 401: Unauthorized
  - 404: Patient not found
  - 500: Server error

#### Get Care Records
- **Method**: GET
- **URL**: `/nurses/patients/:id/care-records`
- **Description**: Retrieve care records for a patient
- **Authentication**: Required (Nurse)
- **Parameters**: 
  - id (path): Patient ID
- **Response**: 
  - 200: Array of care records
  - 401: Unauthorized
  - 404: Patient not found
  - 500: Server error

#### Update Care Record
- **Method**: PUT
- **URL**: `/nurses/care-records/:recordId`
- **Description**: Update a specific care record
- **Authentication**: Required (Nurse)
- **Parameters**: 
  - recordId (path): Care Record ID
- **Request Body**:
  ```json
  {
    "care_details": "Updated patient care details",
    "medication_administered": "Updated medications",
    "notes": "Additional notes"
  }
  ```
- **Response**: 
  - 200: Updated care record
  - 400: Bad request (missing data)
  - 401: Unauthorized
  - 404: Care record not found
  - 500: Server error

#### Delete Care Record
- **Method**: DELETE
- **URL**: `/nurses/care-records/:recordId`
- **Description**: Delete a specific care record
- **Authentication**: Required (Nurse)
- **Parameters**: 
  - recordId (path): Care Record ID
- **Response**: 
  - 200: Deleted care record
  - 401: Unauthorized
  - 404: Care record not found
  - 500: Server error

## Database Tables Required

### nurse_vitals
```sql
CREATE TABLE nurse_vitals (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    nurse_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    vital_signs TEXT,
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### nurse_care_records
```sql
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

## Implementation Priority

1. **High Priority**:
   - Get All Patients
   - Get All Appointments
   - Add Vitals
   - Get Patient Vitals

2. **Medium Priority**:
   - Update Appointment Status
   - Add Care Record
   - Get Care Records

3. **Low Priority**:
   - Update Care Record
   - Delete Care Record

## Security Considerations

1. All endpoints must require authentication
2. Only users with the 'nurse' role should be able to access these endpoints
3. Nurses should only be able to access records for patients in their care
4. Proper input validation to prevent injection attacks
5. Rate limiting to prevent abuse