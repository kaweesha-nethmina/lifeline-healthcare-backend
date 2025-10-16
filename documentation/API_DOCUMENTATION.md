# Lifeline Smart Healthcare System - API Documentation

## Overview

This document provides comprehensive documentation for all API endpoints in the Lifeline Smart Healthcare System. The system supports 8 distinct user roles with their specific functionalities.

## Table of Contents

1. [Authentication](#authentication)
2. [User Profile](#user-profile)
3. [Profile Pictures](#profile-pictures)
4. [Patients](#patients)
5. [Doctors](#doctors)
6. [Nurses](#nurses)
7. [Hospital Staff](#hospital-staff)
8. [Admin](#admin)
9. [Healthcare Managers](#healthcare-managers)
10. [System Administrators](#system-administrators)
11. [Emergency Services](#emergency-services)
12. [Payments](#payments)
13. [Insurance](#insurance)
14. [Prescriptions](#prescriptions)
15. [Notifications](#notifications)
16. [Database Schema](#database-schema)
17. [Data Flow](#data-flow)

## Authentication

### Register User
**Endpoint:** `POST /auth/register`  
**Description:** Register a new user with specified role  
**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "name": "John Doe",
  "role": "patient",
  "password": "securePassword123"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "patient",
    "created_at": "2025-10-14T10:00:00Z",
    "updated_at": "2025-10-14T10:00:00Z"
  }
}
```

### Login User
**Endpoint:** `POST /auth/login`  
**Description:** Authenticate user and generate JWT token  
**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "patient"
  }
}
```

## User Profile

### Get User Profile
**Endpoint:** `GET /users/profile`  
**Description:** Retrieve the authenticated user's profile information including profile picture URL and new patient fields  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
{
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
```

### Update User Profile
**Endpoint:** `PUT /users/profile`  
**Description:** Update the authenticated user's profile information (excluding profile picture)  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "name": "John Updated",
  "phone_number": "+1234567890",
  "date_of_birth": "1990-01-15",
  "gender": "Male",
  "address": "123 Main St, City, Country",
  "emergency_contact": "Jane Doe: +1234567891"
}
```
**Response:**
```json
{
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "email": "john.doe@example.com",
    "name": "John Updated",
    "role": "patient",
    "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_1_1234567890.jpg",
    "phone_number": "+1234567890",
    "date_of_birth": "1990-01-15",
    "gender": "Male",
    "address": "123 Main St, City, Country",
    "emergency_contact": "Jane Doe: +1234567891",
    "created_at": "2025-10-14T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z"
  }
}
```

## Profile Pictures

### Upload Profile Picture
**Endpoint:** `POST /users/profile/picture`  
**Description:** Upload a new profile picture for the authenticated user  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:** Form-data with `profilePicture` field containing the image file  
**Response:**
```json
{
  "message": "Profile picture updated successfully",
  "data": {
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
    "updated_at": "2025-10-15T10:00:00Z"
  },
  "fileUrl": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_1_1234567890.jpg"
}
```

### Update Profile Picture
**Endpoint:** `PUT /users/profile/picture`  
**Description:** Replace the existing profile picture with a new one for the authenticated user  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:** Form-data with `profilePicture` field containing the image file  
**Response:**
```json
{
  "message": "Profile picture updated successfully",
  "data": {
    "id": 1,
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "patient",
    "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_1_9876543210.jpg",
    "phone_number": "+1234567890",
    "date_of_birth": "1990-01-15",
    "gender": "Male",
    "address": "123 Main St, City, Country",
    "emergency_contact": "Jane Doe: +1234567891",
    "created_at": "2025-10-14T10:00:00Z",
    "updated_at": "2025-10-15T11:00:00Z"
  },
  "fileUrl": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_1_9876543210.jpg"
}
```

### Get Own Profile Picture
**Endpoint:** `GET /users/profile/picture`  
**Description:** Retrieve the profile picture URL for the authenticated user  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
{
  "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_1_9876543210.jpg"
}
```

### Delete Own Profile Picture
**Endpoint:** `DELETE /users/profile/picture`  
**Description:** Remove the profile picture for the authenticated user  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
{
  "message": "Profile picture deleted successfully",
  "data": {
    "id": 1,
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "patient",
    "profile_picture_url": null,
    "phone_number": "+1234567890",
    "date_of_birth": "1990-01-15",
    "gender": "Male",
    "address": "123 Main St, City, Country",
    "emergency_contact": "Jane Doe: +1234567891",
    "created_at": "2025-10-14T10:00:00Z",
    "updated_at": "2025-10-15T12:00:00Z"
  }
}
```

### Get Any User's Profile Picture (Admin Only)
**Endpoint:** `GET /users/profile/picture/:userId`  
**Description:** Retrieve the profile picture URL for any user (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `userId` - ID of the user whose profile picture URL to retrieve  
**Response:**
```json
{
  "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_2_1234567890.jpg"
}
```

### Update Any User's Profile Picture (Admin Only)
**Endpoint:** `PUT /users/profile/picture/:userId`  
**Description:** Replace the profile picture for any user (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `userId` - ID of the user whose profile picture to update  
**Request Body:** Form-data with `profilePicture` field containing the image file  
**Response:**
```json
{
  "message": "Profile picture updated successfully",
  "data": {
    "id": 2,
    "email": "jane.doe@example.com",
    "name": "Jane Doe",
    "role": "doctor",
    "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_2_9876543210.jpg",
    "phone_number": "+1234567891",
    "date_of_birth": "1985-05-20",
    "gender": "Female",
    "address": "456 Oak Ave, City, Country",
    "emergency_contact": "John Doe: +1234567890",
    "created_at": "2025-10-14T11:00:00Z",
    "updated_at": "2025-10-15T13:00:00Z"
  },
  "fileUrl": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_2_9876543210.jpg"
}
```

### Delete Any User's Profile Picture (Admin Only)
**Endpoint:** `DELETE /users/profile/picture/:userId`  
**Description:** Remove the profile picture for any user (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `userId` - ID of the user whose profile picture to delete  
**Response:**
```json
{
  "message": "Profile picture deleted successfully",
  "data": {
    "id": 2,
    "email": "jane.doe@example.com",
    "name": "Jane Doe",
    "role": "doctor",
    "profile_picture_url": null,
    "phone_number": "+1234567891",
    "date_of_birth": "1985-05-20",
    "gender": "Female",
    "address": "456 Oak Ave, City, Country",
    "emergency_contact": "John Doe: +1234567890",
    "created_at": "2025-10-14T11:00:00Z",
    "updated_at": "2025-10-15T14:00:00Z"
  }
}
```

## Patients

### Get Patient Profile
**Endpoint:** `GET /patients/profile`  
**Description:** Retrieve the authenticated patient's profile information including user details  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
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

### Update Patient Profile
**Endpoint:** `PUT /patients/profile`  
**Description:** Update the authenticated patient's profile information  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "date_of_birth": "1990-01-15",
  "gender": "Male",
  "phone_number": "+1234567890",
  "address": "123 Main St, City, Country",
  "insurance_details": "Insurance Co, Policy #12345",
  "medical_history": "Allergies: Penicillin, Conditions: Hypertension",
  "emergency_contact": "Jane Doe: +1234567891",
  "preferred_location": "Downtown Medical Center"
}
```
**Response:**
```json
{
  "message": "Profile updated successfully",
  "patientData": {
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
    "updated_at": "2025-10-15T10:00:00Z"
  },
  "userData": {
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
    "updated_at": "2025-10-15T10:00:00Z"
  }
}
```

### Book Appointment
**Endpoint:** `POST /patients/appointments`  
**Description:** Book a new appointment with a doctor  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "doctor_id": 1,
  "appointment_date": "2025-12-01T10:00:00Z",
  "location": "City Hospital, Main Campus"
}
```
**Response:**
```json
{
  "message": "Appointment booked successfully",
  "data": {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 1,
    "appointment_date": "2025-12-01T10:00:00Z",
    "status": "booked",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z",
    "location": "City Hospital, Main Campus"
  }
}
```

### Get Appointment History
**Endpoint:** `GET /patients/appointments`  
**Description:** Retrieve the authenticated patient's appointment history with doctor details and location  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
[
  {
    "id": 9,
    "patient_id": 1,
    "doctor_id": 3,
    "appointment_date": "2025-10-17T06:32:00+00:00",
    "status": "booked",
    "location": "City Hospital, Main Campus",
    "created_at": "2025-10-15T16:33:51.706967+00:00",
    "updated_at": "2025-10-15T16:33:51.706967+00:00",
    "doctors": {
      "user_id": 11,
      "specialty": "Cardiology",
      "schedule": "Monday-Friday: 9AM-5PM at City Hospital",
      "users": {
        "name": "Dr. John Smith"
      }
    },
    "doctor_name": "Dr. John Smith",
    "doctor_location": "City Hospital"
  }
]
```

### Update Appointment
**Endpoint:** `PUT /patients/appointments/:id`  
**Description:** Update an existing appointment  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Appointment ID
**Request Body:**
```json
{
  "doctor_id": 1,
  "appointment_date": "2025-12-01T10:00:00Z",
  "location": "City Hospital, Main Campus",
  "status": "rescheduled"
}
```
**Response:**
```json
{
  "message": "Appointment updated successfully",
  "data": {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 1,
    "appointment_date": "2025-12-01T10:00:00Z",
    "status": "rescheduled",
    "location": "City Hospital, Main Campus",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T17:00:00Z"
  }
}
```

### Delete Appointment
**Endpoint:** `DELETE /patients/appointments/:id`  
**Description:** Delete an existing appointment  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Appointment ID
**Response:**
```json
{
  "message": "Appointment deleted successfully",
  "data": {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 1,
    "appointment_date": "2025-12-01T10:00:00Z",
    "status": "cancelled",
    "location": "City Hospital, Main Campus",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T17:00:00Z"
  }
}
```

### Get Medical Records
**Endpoint:** `GET /patients/medical-records`  
**Description:** Retrieve the authenticated patient's medical records  
**Headers:** `Authorization: Bearer <token>`  

### Get Vital Signs
**Endpoint:** `GET /patients/vital-signs`  
**Description:** Retrieve vital signs history for the authenticated patient  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
[
  {
    "id": 1,
    "patient_id": 1,
    "nurse_id": 3,
    "vital_signs": "BP: 120/80, HR: 72, Temp: 98.6°F",
    "recorded_at": "2025-10-15T10:00:00Z",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z",
    "users": {
      "name": "Nurse Jane"
    }
  }
]
```

### Get All Doctors
**Endpoint:** `GET /patients/doctors`
**Description:** Retrieve all doctors in the system with their user details including profile picture
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
[
  {
    "id": 1,
    "user_id": 2,
    "name": "Dr. John Smith",
    "email": "john.smith@hospital.com",
    "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_2_1234567890.jpg",
    "specialty": "Cardiology",
    "qualification": "MD, Board Certified",
    "schedule": "Monday-Friday: 9AM-5PM"
  }
]
```

### Get All Insurance Providers
**Endpoint:** `GET /patients/insurance-providers`
**Description:** Retrieve all insurance providers in the system
**Headers:** `Authorization: Bearer <token>`
**Response:**
```json
[
  {
    "user_id": 5,
    "provider_id": 1,
    "name": "Health Insurance Co",
    "email": "contact@healthinsurance.com"
  }
]
```

## Doctors

### Get Doctor Profile
**Endpoint:** `GET /doctors/profile`  
**Description:** Retrieve the authenticated doctor's profile information  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
{
  "id": 1,
  "user_id": 2,
  "specialty": "Cardiology",
  "qualification": "MD, Board Certified",
  "schedule": "Monday-Friday: 9AM-5PM",
  "location": "City Hospital, Main Campus",
  "created_at": "2025-10-14T10:00:00Z",
  "updated_at": "2025-10-14T10:00:00Z"
}
```

### Update Doctor Profile
**Endpoint:** `PUT /doctors/profile`  
**Description:** Update the authenticated doctor's profile information  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "specialty": "Cardiology",
  "qualification": "MD, Board Certified",
  "schedule": "Monday-Friday: 9AM-5PM",
  "location": "City Hospital, Main Campus"
}
```

### View Patient Medical Records
**Endpoint:** `GET /doctors/patients/:id/medical-records`  
**Description:** Retrieve medical records for a specific patient (requires appointment relationship)  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Patient ID  

### Create Medical Record
**Endpoint:** `POST /doctors/patients/:id/medical-records`  
**Description:** Create a new medical record for a specific patient (requires appointment relationship)  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Patient ID  
**Request Body:**

**Endpoint:** `DELETE /doctors/medical-records/:recordId`  
**Description:** Delete a specific medical record by ID (requires appointment relationship)  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `recordId` - Medical Record ID
**Response:**
```json
{
  "message": "Medical record deleted successfully",
  "data": {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 1,
    "diagnosis": "Hypertension",
    "treatment_plan": "Prescribed medication and lifestyle changes",
    "prescriptions": "Lisinopril 10mg daily",
    "record_date": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T17:00:00Z"
  }
}
```

### Get All Patients with Appointments
**Endpoint:** `GET /doctors/patients`  
**Description:** Retrieve all patients who have booked appointments with the authenticated doctor (excluding cancelled appointments)  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
[
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
]
```

### Get All Medical Records
**Endpoint:** `GET /doctors/medical-records`  
**Description:** Retrieve all medical records for patients who have appointments with the authenticated doctor  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
[
  {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 1,
    "diagnosis": "Hypertension",
    "treatment_plan": "Prescribed medication and lifestyle changes",
    "prescriptions": "Lisinopril 10mg daily",
    "record_date": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z",
    "patient_name": "John Doe",
    "patient_email": "john.doe@example.com",
    "doctor_name": "Dr. Smith"
  }
]
```

### Get Appointment Schedule
**Endpoint:** `GET /doctors/appointments`  
**Description:** Retrieve the authenticated doctor's appointment schedule  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
[
  {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 1,
    "appointment_date": "2025-12-01T10:00:00Z",
    "status": "booked",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z",
    "patient": {
      "id": 1,
      "user_id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "date_of_birth": "1990-01-15",
      "gender": "Male",
      "phone_number": "+1234567890",
      "address": "123 Main St, City, Country",
      "insurance_details": "Insurance Co, Policy #12345",
      "medical_history": "Allergies: Penicillin, Conditions: Hypertension",
      "emergency_contact": "Jane Doe: +1234567891",
      "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_1_1234567890.jpg",
      "created_at": "2025-10-14T10:00:00Z",
      "updated_at": "2025-10-14T10:00:00Z"
    }
  }
]
```

### Get Patient Details
**Endpoint:** `GET /doctors/patients/:id/details`  
**Description:** Retrieve detailed patient information including personal details, medical records, and vital signs for a specific patient (requires appointment relationship)  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Patient ID  
**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "date_of_birth": "1990-01-15",
  "age": 35,
  "gender": "Male",
  "phone_number": "+1234567890",
  "address": "123 Main St, City, Country",
  "emergency_contact": "Jane Doe: +1234567891",
  "insurance_details": "Insurance Co, Policy #12345",
  "medical_history": "Allergies: Penicillin, Conditions: Hypertension",
  "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_1_1234567890.jpg",
  "created_at": "2025-10-14T10:00:00Z",
  "updated_at": "2025-10-14T10:00:00Z",
  "medical_records": [
    {
      "id": 1,
      "diagnosis": "Hypertension",
      "treatment_plan": "Prescribed medication and lifestyle changes",
      "prescriptions": "Lisinopril 10mg daily",
      "record_date": "2025-10-15T10:00:00Z",
      "updated_at": "2025-10-15T10:00:00Z",
      "doctor_name": "Dr. Smith"
    }
  ],
  "vital_signs": [
    {
      "id": 1,
      "vital_signs": "BP: 120/80, HR: 72, Temp: 98.6°F",
      "recorded_at": "2025-10-15T10:00:00Z",
      "updated_at": "2025-10-15T10:00:00Z",
      "nurse_name": "Nurse Jane"
    }
  ]
}
```

### Get Appointment Details by Patient
**Endpoint:** `GET /doctors/patients/:id/appointments`  
**Description:** Retrieve appointment details for a specific patient (requires appointment relationship)  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Patient ID  
**Response:**
```json
[
  {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 1,
    "appointment_date": "2025-12-01T10:00:00Z",
    "status": "booked",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z",
    "patient": {
      "id": 1,
      "user_id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "date_of_birth": "1990-01-15",
      "gender": "Male",
      "phone_number": "+1234567890",
      "address": "123 Main St, City, Country",
      "insurance_details": "Insurance Co, Policy #12345",
      "medical_history": "Allergies: Penicillin, Conditions: Hypertension",
      "emergency_contact": "Jane Doe: +1234567891",
      "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_1_1234567890.jpg"
    },
    "doctor": {
      "id": 1,
      "user_id": 2,
      "name": "Dr. Smith",
      "email": "dr.smith@hospital.com",
      "specialty": "Cardiology",
      "qualification": "MD, Board Certified",
      "schedule": "Monday-Friday: 9AM-5PM",
      "phone_number": "+1234567890",
      "address": "456 Medical Plaza, City, Country",
      "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_2_1234567890.jpg"
    }
  }
]
```

## Nurses

### Get All Patients
**Endpoint:** `GET /nurses/patients`  
**Description:** Retrieve all patients in the system  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
[
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
    "users": {
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  }
]
```

### Get All Appointments
**Endpoint:** `GET /nurses/appointments`  
**Description:** Retrieve all appointments in the system  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
[
  {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 1,
    "appointment_date": "2025-12-01T10:00:00Z",
    "status": "booked",
    "location": "City Hospital, Main Campus",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z",
    "patients": {
      "user_id": 1
    },
    "doctors": {
      "user_id": 2
    }
  }
]
```

### Update Appointment Status
**Endpoint:** `PUT /nurses/appointments/:id/status`  
**Description:** Update the status of an appointment  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Appointment ID  
**Request Body:**
```json
{
  "status": "completed"
}
```
**Response:**
```json
{
  "message": "Appointment status updated successfully",
  "data": {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 1,
    "appointment_date": "2025-12-01T10:00:00Z",
    "status": "completed",
    "location": "City Hospital, Main Campus",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T17:00:00Z"
  }
}
```

### Add Vitals
**Endpoint:** `POST /nurses/patients/:id/vitals`  
**Description:** Add vital signs for a specific patient  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Patient ID  
**Request Body:**
```json
{
  "vital_signs": "BP: 120/80, HR: 72, Temp: 98.6°F"
}
```
**Response:**
```json
{
  "message": "Vitals added successfully",
  "data": {
    "id": 1,
    "patient_id": 1,
    "nurse_id": 3,
    "vital_signs": "BP: 120/80, HR: 72, Temp: 98.6°F",
    "recorded_at": "2025-10-15T10:00:00Z",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z"
  }
}
```

### Get Patient Vitals
**Endpoint:** `GET /nurses/patients/:id/vitals`  
**Description:** Retrieve vital signs history for a specific patient  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Patient ID  
**Response:**
```json
[
  {
    "id": 1,
    "patient_id": 1,
    "nurse_id": 3,
    "vital_signs": "BP: 120/80, HR: 72, Temp: 98.6°F",
    "recorded_at": "2025-10-15T10:00:00Z",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z"
  }
]
```

### Add Care Record
**Endpoint:** `POST /nurses/patients/:id/care-records`  
**Description:** Add a care record for a specific patient  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Patient ID  
**Request Body:**
```json
{
  "care_details": "Patient is stable and responding well to treatment",
  "medication_administered": "Paracetamol 500mg",
  "notes": "Patient reports reduced pain levels"
}
```
**Response:**
```json
{
  "message": "Care record added successfully",
  "data": {
    "id": 1,
    "patient_id": 1,
    "nurse_id": 3,
    "care_details": "Patient is stable and responding well to treatment",
    "medication_administered": "Paracetamol 500mg",
    "notes": "Patient reports reduced pain levels",
    "recorded_at": "2025-10-15T10:00:00Z",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z"
  }
}
```

### Get Care Records
**Endpoint:** `GET /nurses/patients/:id/care-records`  
**Description:** Retrieve care records for a specific patient  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Patient ID  
**Response:**
```json
[
  {
    "id": 1,
    "patient_id": 1,
    "nurse_id": 3,
    "care_details": "Patient is stable and responding well to treatment",
    "medication_administered": "Paracetamol 500mg",
    "notes": "Patient reports reduced pain levels",
    "recorded_at": "2025-10-15T10:00:00Z",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z",
    "users": {
      "name": "Nurse Jane"
    }
  }
]
```

### Update Care Record
**Endpoint:** `PUT /nurses/care-records/:recordId`  
**Description:** Update a specific care record  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `recordId` - Care Record ID  
**Request Body:**
```json
{
  "care_details": "Patient is stable and responding well to treatment",
  "medication_administered": "Paracetamol 500mg, Ibuprofen 200mg",
  "notes": "Patient reports significantly reduced pain levels"
}
```
**Response:**
```json
{
  "message": "Care record updated successfully",
  "data": {
    "id": 1,
    "patient_id": 1,
    "nurse_id": 3,
    "care_details": "Patient is stable and responding well to treatment",
    "medication_administered": "Paracetamol 500mg, Ibuprofen 200mg",
    "notes": "Patient reports significantly reduced pain levels",
    "recorded_at": "2025-10-15T10:00:00Z",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T17:00:00Z"
  }
}
```

### Delete Care Record
**Endpoint:** `DELETE /nurses/care-records/:recordId`  
**Description:** Delete a specific care record  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `recordId` - Care Record ID  
**Response:**
```json
{
  "message": "Care record deleted successfully",
  "data": {
    "id": 1,
    "patient_id": 1,
    "nurse_id": 3,
    "care_details": "Patient is stable and responding well to treatment",
    "medication_administered": "Paracetamol 500mg",
    "notes": "Patient reports reduced pain levels",
    "recorded_at": "2025-10-15T10:00:00Z",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z"
  }
}
```

### Update Patient Care Information
**Endpoint:** `POST /nurses/patients/:id/care`  
**Description:** Update care information for a specific patient  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Patient ID  
**Request Body:**
```json
{
  "vital_signs": "BP: 120/80, HR: 72",
  "medication_administered": "Paracetamol 500mg",
  "notes": "Patient stable"
}
```

### Get Patient Care History
**Endpoint:** `GET /nurses/patients/:id/care`  
**Description:** Retrieve care history for a specific patient  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Patient ID

## Hospital Staff

### Patient Check-In
**Endpoint:** `POST /staff/check-in/:id`  
**Description:** Check in a patient for their visit  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Patient ID  
**Request Body:**
```json
{
  "check_in_time": "2025-12-01T09:00:00Z",
  "department": "Cardiology",
  "reason_for_visit": "Routine checkup"
}
```

### Get Patient Information
**Endpoint:** `GET /staff/patients/:id`  
**Description:** Retrieve information for a specific patient including check-in history  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Patient ID  

## Admin

### Create User
**Endpoint:** `POST /admin/create-user`  
**Description:** Create a new user with specified role (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "email": "dr.smith@example.com",
  "name": "Dr. Smith",
  "role": "doctor",
  "password": "doctorPassword123"
}
```

### Configure System
**Endpoint:** `POST /admin/configure-system`  
**Description:** Configure system settings (admin only)  
**Headers:** `Authorization: Bearer <token>`  

### Get All Users
**Endpoint:** `GET /admin/users`  
**Description:** Retrieve all users in the system (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
[
  {
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
  },
  {
    "id": 2,
    "email": "jane.smith@example.com",
    "name": "Dr. Jane Smith",
    "role": "doctor",
    "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_2_9876543210.jpg",
    "phone_number": "+1234567891",
    "date_of_birth": "1985-05-20",
    "gender": "Female",
    "address": "456 Oak Ave, City, Country",
    "emergency_contact": "John Doe: +1234567890",
    "created_at": "2025-10-14T11:00:00Z",
    "updated_at": "2025-10-14T11:00:00Z"
  }
]
```

### Update User
**Endpoint:** `PUT /admin/users/:id`  
**Description:** Update a user's information (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - User ID  
**Request Body:**
```json
{
  "name": "John Updated",
  "role": "patient",
  "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_1_1234567890.jpg",
  "phone_number": "+1234567890",
  "date_of_birth": "1990-01-15",
  "gender": "Male",
  "address": "123 Main St, City, Country",
  "emergency_contact": "Jane Doe: +1234567891"
}
```
**Response:**
```json
{
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "email": "john.doe@example.com",
    "name": "John Updated",
    "role": "patient",
    "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_1_1234567890.jpg",
    "phone_number": "+1234567890",
    "date_of_birth": "1990-01-15",
    "gender": "Male",
    "address": "123 Main St, City, Country",
    "emergency_contact": "Jane Doe: +1234567891",
    "created_at": "2025-10-14T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z"
  }
}
```

### Delete User
**Endpoint:** `DELETE /admin/users/:id`  
**Description:** Delete a user from the system (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - User ID  
**Response:**
```json
{
  "message": "User deleted successfully",
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

### Get All Appointments
**Endpoint:** `GET /admin/appointments`  
**Description:** Retrieve all appointments in the system with patient and doctor details (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
[
  {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 2,
    "appointment_date": "2025-10-20T10:00:00Z",
    "status": "scheduled",
    "notes": "Regular checkup",
    "location": "City Hospital, Main Campus",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z",
    "patients": {
      "id": 1,
      "user_id": 1,
      "users": {
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
    },
    "doctors": {
      "id": 2,
      "user_id": 3,
      "users": {
        "name": "Dr. Jane Smith",
        "email": "jane.smith@example.com"
      }
    }
  }
]
```

### Generate Appointment Report
**Endpoint:** `GET /admin/reports/appointments`  
**Description:** Generate a report of appointments with optional filters (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Query Parameters:** 
- `startDate` - Filter appointments from this date (ISO format)
- `endDate` - Filter appointments up to this date (ISO format)
- `status` - Filter appointments by status
- `doctorId` - Filter appointments by doctor ID
- `patientId` - Filter appointments by patient ID
**Response:**
```json
[
  {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 2,
    "appointment_date": "2025-10-20T10:00:00Z",
    "status": "scheduled",
    "notes": "Regular checkup",
    "location": "City Hospital, Main Campus",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T10:00:00Z",
    "patients": {
      "id": 1,
      "user_id": 1,
      "users": {
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
    },
    "doctors": {
      "id": 2,
      "user_id": 3,
      "users": {
        "name": "Dr. Jane Smith",
        "email": "jane.smith@example.com"
      }
    }
  }
]
```

### Get Appointment by ID
**Endpoint:** `GET /admin/appointments/:id`  
**Description:** Retrieve full details of a specific appointment including complete patient and doctor information (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Appointment ID  
**Response:**
```json
{
  "id": 1,
  "patient_id": 1,
  "doctor_id": 2,
  "appointment_date": "2025-10-20T10:00:00Z",
  "status": "scheduled",
  "notes": "Regular checkup",
  "location": "City Hospital, Main Campus",
  "created_at": "2025-10-15T10:00:00Z",
  "updated_at": "2025-10-15T10:00:00Z",
  "patients": {
    "id": 1,
    "user_id": 1,
    "date_of_birth": "1990-01-15",
    "gender": "Male",
    "phone_number": "+1234567890",
    "address": "123 Main St, City, Country",
    "insurance_details": "Policy #12345",
    "medical_history": "Allergies: Penicillin",
    "emergency_contact": "Jane Doe: +1234567891",
    "users": {
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
  },
  "doctors": {
    "id": 2,
    "user_id": 3,
    "specialty": "Cardiology",
    "qualification": "MD Cardiology",
    "schedule": "Mon-Fri 9am-5pm",
    "users": {
      "id": 3,
      "email": "jane.smith@example.com",
      "name": "Dr. Jane Smith",
      "role": "doctor",
      "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_3_9876543210.jpg",
      "phone_number": "+1234567891",
      "date_of_birth": "1985-05-20",
      "gender": "Female",
      "address": "456 Oak Ave, City, Country",
      "emergency_contact": "John Doe: +1234567890",
      "created_at": "2025-10-14T11:00:00Z",
      "updated_at": "2025-10-14T11:00:00Z"
    }
  }
}
```

### Update Appointment Status
**Endpoint:** `PUT /admin/appointments/:id/status`  
**Description:** Update the status of a specific appointment (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Appointment ID  
**Request Body:**
```json
{
  "status": "confirmed"
}
```
**Response:**
```json
{
  "message": "Appointment status updated successfully",
  "appointment": {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 2,
    "appointment_date": "2025-10-20T10:00:00Z",
    "status": "confirmed",
    "notes": "Patient requested morning appointment",
    "location": "City Hospital, Main Campus",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T11:00:00Z"
  }
}
```

### Delete Appointment
**Endpoint:** `DELETE /admin/appointments/:id`  
**Description:** Delete a specific appointment from the system (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Appointment ID  
**Response:**
```json
{
  "message": "Appointment deleted successfully",
  "appointment": {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 2,
    "appointment_date": "2025-10-20T10:00:00Z",
    "status": "confirmed",
    "notes": "Patient requested morning appointment",
    "location": "City Hospital, Main Campus",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T11:00:00Z"
  }
}
```

### Get Doctor Performance Report
**Endpoint:** `GET /admin/reports/doctors/performance`  
**Description:** Get performance report for doctors based on appointment counts (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
{
  "2": {
    "name": "Dr. Jane Smith",
    "total": 10,
    "byStatus": {
      "scheduled": 3,
      "confirmed": 5,
      "completed": 2
    }
  },
  "3": {
    "name": "Dr. John Wilson",
    "total": 5,
    "byStatus": {
      "scheduled": 2,
      "confirmed": 2,
      "cancelled": 1
    }
  }
}
```

### Generate Monthly User Activity Report
**Endpoint:** `GET /admin/reports/users/activity`  
**Description:** Generate a monthly user activity report including registrations, appointments, and medical records (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Query Parameters:** 
- `month` - The month for the report (1-12)
- `year` - The year for the report (e.g., 2025)
**Response:**
```json
{
  "month": "10/2025",
  "userRegistrations": {
    "total": 15,
    "byRole": {
      "patient": 10,
      "doctor": 3,
      "nurse": 2
    }
  },
  "appointments": {
    "total": 25,
    "byStatus": {
      "scheduled": 10,
      "confirmed": 12,
      "completed": 2,
      "cancelled": 1
    }
  },
  "medicalRecords": {
    "total": 20
  },
  "dailyActivity": {
    "2025-10-01": {
      "registrations": 2,
      "appointments": 3,
      "medicalRecords": 1
    },
    "2025-10-02": {
      "registrations": 1,
      "appointments": 2,
      "medicalRecords": 3
    }
  }
}
```

### Get Appointment Statistics
**Endpoint:** `GET /admin/reports/appointments/statistics`  
**Description:** Get comprehensive statistics about appointments including status distribution and monthly trends (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
{
  "total": 45,
  "byStatus": {
    "scheduled": 15,
    "confirmed": 20,
    "completed": 7,
    "cancelled": 3
  },
  "monthlyTrends": {
    "2025-08": {
      "scheduled": 5,
      "confirmed": 8,
      "completed": 2,
      "cancelled": 1
    },
    "2025-09": {
      "scheduled": 7,
      "confirmed": 9,
      "completed": 3,
      "cancelled": 1
    },
    "2025-10": {
      "scheduled": 3,
      "confirmed": 3,
      "completed": 2,
      "cancelled": 1
    }
  }
}
```

### Get Medical Records Summary
**Endpoint:** `GET /admin/reports/medical-records/summary`  
**Description:** Get a summary of medical records including total count, recent records, and top diagnoses (admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
{
  "total": 120,
  "recentRecords": [
    {
      "id": 15,
      "diagnosis": "Hypertension",
      "treatment_plan": "Prescribed medication and lifestyle changes",
      "created_at": "2025-10-15T10:00:00Z",
      "patients": {
        "id": 5,
        "user_id": 5,
        "users": {
          "name": "John Doe"
        }
      },
      "doctors": {
        "id": 2,
        "user_id": 3,
        "users": {
          "name": "Dr. Jane Smith"
        }
      }
    }
  ],
  "topDiagnoses": [
    {
      "diagnosis": "Hypertension",
      "count": 25
    },
    {
      "diagnosis": "Diabetes",
      "count": 18
    }
  ]
}
```

## Healthcare Managers

### View Healthcare Data and Analytics
**Endpoint:** `GET /manager/data`  
**Description:** Retrieve healthcare data and analytics (manager only)  
**Headers:** `Authorization: Bearer <token>`  

### Get Resource Utilization
**Endpoint:** `GET /manager/resources`  
**Description:** Retrieve resource utilization information (manager only)  
**Headers:** `Authorization: Bearer <token>`  

## System Administrators

### Perform System Maintenance
**Endpoint:** `POST /system-admin/system-maintenance`  
**Description:** Perform system maintenance tasks (system admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "maintenance_type": "backup",
  "details": "Daily backup completed successfully"
}
```

### Monitor System Logs
**Endpoint:** `GET /system-admin/logs`  
**Description:** Retrieve system logs (system admin only)  
**Headers:** `Authorization: Bearer <token>`  

### Create System Backup
**Endpoint:** `POST /system-admin/backup`  
**Description:** Create a system backup (system admin only)  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "backup_name": "daily_backup_20251201",
  "backup_type": "full"
}
```

## Emergency Services

### Log Emergency Case
**Endpoint:** `POST /emergency/emergency`  
**Description:** Log a new emergency case  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "patient_id": 1,
  "emergency_type": "ambulance",
  "resource_id": 1
}
```

### Create Emergency Resource
**Endpoint:** `POST /emergency/resources`  
**Description:** Create a new emergency resource  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "resource_type": "bed",
  "location": "Emergency Ward 1",
  "status": "available"
}
```

### View Available Resources
**Endpoint:** `GET /emergency/resources`  
**Description:** Retrieve all emergency resources  
**Headers:** `Authorization: Bearer <token>`  

### Get All Emergency Cases
**Endpoint:** `GET /emergency/cases`  
**Description:** Retrieve all emergency cases  
**Headers:** `Authorization: Bearer <token>`  

### Update Emergency Case Status
**Endpoint:** `PUT /emergency/cases/:id`  
**Description:** Update the status of an emergency case  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Emergency case ID  
**Request Body:**
```json
{
  "case_status": "under-care",
  "resource_id": 2
}
```

## Payments

### Process Payment
**Endpoint:** `POST /payments/process-payment`  
**Description:** Process a payment for a patient  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "patient_id": 1,
  "amount": 150.00,
  "payment_method": "credit"
}
```

### Get Payment History
**Endpoint:** `GET /payments/payment-history/:patientId`  
**Description:** Retrieve payment history for a specific patient  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `patientId` - Patient ID  

### Get Payment by ID
**Endpoint:** `GET /payments/:id`  
**Description:** Retrieve a specific payment by ID  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Payment ID  

## Insurance

### Verify Insurance Eligibility
**Endpoint:** `POST /insurance/verify-eligibility`  
**Description:** Verify if a patient is eligible for insurance coverage  
**Headers:** `Authorization: Bearer <token>`  
**Request Body (using user ID):**
```json
{
  "patient_id": 1,
  "insurance_provider_user_id": 18
}
```
**Request Body (using provider ID):**
```json
{
  "patient_id": 1,
  "insurance_provider_id": 1
}
```

### Process Insurance Claim
**Endpoint:** `POST /insurance/process-claim`  
**Description:** Process an insurance claim for a patient  
**Headers:** `Authorization: Bearer <token>`  
**Request Body (using user ID):**
```json
{
  "patient_id": 1,
  "insurance_provider_user_id": 18,
  "claim_amount": 150.00
}
```
**Request Body (using provider ID):**
```json
{
  "patient_id": 1,
  "insurance_provider_id": 1,
  "claim_amount": 150.00
}
```

### Get Insurance Providers
**Endpoint:** `GET /insurance/providers`  
**Description:** Retrieve all insurance providers  
**Headers:** `Authorization: Bearer <token>`  

### Get Patient Insurance Claims
**Endpoint:** `GET /insurance/claims/:patientId`  
**Description:** Retrieve insurance claims for a specific patient  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `patientId` - Patient ID  

## Prescriptions

### Create Prescription
**Endpoint:** `POST /prescriptions`  
**Description:** Create a new prescription  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "medical_record_id": 1,
  "medication": "Paracetamol",
  "dosage": "500mg twice daily",
  "pharmacy_id": 1
}
```

### Get Prescriptions by Medical Record
**Endpoint:** `GET /prescriptions/medical-record/:medicalRecordId`  
**Description:** Retrieve prescriptions for a specific medical record  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `medicalRecordId` - Medical Record ID  

### Update Prescription
**Endpoint:** `PUT /prescriptions/:id`  
**Description:** Update a specific prescription  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Prescription ID  
**Request Body:**
```json
{
  "medication": "Paracetamol",
  "dosage": "500mg three times daily",
  "pharmacy_id": 1
}
```

### Delete Prescription
**Endpoint:** `DELETE /prescriptions/:id`  
**Description:** Delete a specific prescription  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Prescription ID  

## Notifications

### Get User Notifications
**Endpoint:** `GET /notifications`  
**Description:** Retrieve notifications for the authenticated user  
**Headers:** `Authorization: Bearer <token>`  

### Create Notification
**Endpoint:** `POST /notifications`  
**Description:** Create a new notification  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "user_id": 1,
  "message": "Your appointment is confirmed",
  "notification_type": "appointment",
  "status": "unread"
}
```

### Update Notification Status
**Endpoint:** `PUT /notifications/:id/status`  
**Description:** Update the status of a specific notification  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Notification ID  
**Request Body:**
```json
{
  "status": "read"
}
```

### Mark Notification as Read
**Endpoint:** `PUT /notifications/:id/read`  
**Description:** Mark a specific notification as read  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Notification ID  

### Delete Notification
**Endpoint:** `DELETE /notifications/:id`  
**Description:** Delete a specific notification  
**Headers:** `Authorization: Bearer <token>`  
**Parameters:** `id` - Notification ID  

## Database Schema

The system uses the following database tables with their relationships:

### Users
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,  -- 'patient', 'doctor', 'nurse', 'staff', 'admin', etc.
    password VARCHAR(255) NOT NULL,
    profile_picture_url TEXT,  -- URL to the user's profile picture stored in Supabase storage
    phone_number VARCHAR(15),  -- User contact phone number
    date_of_birth DATE,        -- User date of birth
    gender VARCHAR(20),        -- User gender
    address TEXT,              -- User residential address
    emergency_contact VARCHAR(255),  -- Emergency contact information
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

### Patients
```sql
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE,
    gender VARCHAR(20),
    phone_number VARCHAR(15),
    address TEXT,
    insurance_details TEXT,
    medical_history TEXT,
    emergency_contact VARCHAR(255),
    preferred_location VARCHAR(255),  -- Preferred location for appointments
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Doctors
```sql
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    specialty VARCHAR(255),
    qualification VARCHAR(255),
    schedule TEXT,
    location VARCHAR(255) DEFAULT 'Not specified',  -- Default location for appointments
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Appointments
```sql
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
    appointment_date TIMESTAMPTZ NOT NULL,
    status VARCHAR(50) DEFAULT 'booked',
    location VARCHAR(255),  -- Specific location for this appointment
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Medical Records
```sql
CREATE TABLE medical_records (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
    diagnosis TEXT,
    treatment_plan TEXT,
    prescriptions TEXT,
    record_date TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### E-prescriptions
```sql
CREATE TABLE e_prescriptions (
    id SERIAL PRIMARY KEY,
    medical_record_id INTEGER REFERENCES medical_records(id) ON DELETE CASCADE,
    medication VARCHAR(255),
    dosage VARCHAR(255),
    pharmacy_id INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Payments
```sql
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Emergency Resources
```sql
CREATE TABLE emergency_resources (
    id SERIAL PRIMARY KEY,
    resource_type VARCHAR(50),
    status VARCHAR(50),
    location VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Emergency Cases
```sql
CREATE TABLE emergency_cases (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    case_status VARCHAR(50),
    emergency_type VARCHAR(50),
    resource_id INTEGER REFERENCES emergency_resources(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Notifications
```sql
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    notification_type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'unread',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Insurance Providers
```sql
CREATE TABLE insurance_providers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_info TEXT,
    coverage_details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Insurance Claims
```sql
CREATE TABLE insurance_claims (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    insurance_provider_id INTEGER REFERENCES insurance_providers(id) ON DELETE CASCADE,
    claim_status VARCHAR(50),
    claim_amount DECIMAL(10, 2),
    claim_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Check-ins
```sql
CREATE TABLE check_ins (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    check_in_time TIMESTAMPTZ DEFAULT NOW(),
    department VARCHAR(255),
    reason_for_visit TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Nurse Vitals
```sql
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

### Nurse Care Records
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

## Data Flow

### User Registration and Authentication
1. User registers with email, name, role, and password
2. System hashes password and stores user in `users` table
3. System creates role-specific record in corresponding table (patients, doctors, etc.)
4. For insurance providers, system also creates record in `insurance_providers` table
5. User logs in with email and password
6. System verifies credentials and generates JWT token
7. Token contains user ID, email, and role for authorization

### Patient Appointment Flow
1. Patient books appointment with doctor
2. System creates record in `appointments` table
3. System sends notification to patient and doctor
4. On appointment date, staff checks in patient
5. System creates record in `check_ins` table
6. Doctor sees patient and creates medical record
7. System creates record in `medical_records` table
8. Doctor may create prescriptions
9. System creates records in `e_prescriptions` table

### Payment Processing
1. Patient receives treatment
2. System calculates charges
3. Patient makes payment
4. System creates record in `payments` table
5. If patient has insurance, claim is processed
6. System creates record in `insurance_claims` table

### Emergency Handling
1. Emergency case is logged
2. System creates record in `emergency_cases` table
3. System assigns available resource
4. System updates resource status
5. Healthcare staff manages case
6. System updates case status
7. When resolved, case is closed

### Data Relationships
- Users have one-to-one relationships with role-specific tables (patients, doctors)
- Patients have one-to-many relationships with appointments, medical records, payments, emergency cases, check-ins
- Doctors have one-to-many relationships with appointments, medical records
- Appointments link patients and doctors
- Medical records link patients and doctors
- E-prescriptions link to medical records
- Payments link to patients
- Emergency cases link patients and emergency resources
- Notifications link to users
- Insurance claims link patients and insurance providers
- Check-ins link to patients

This comprehensive data model ensures data integrity while supporting all required healthcare functionalities.