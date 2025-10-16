# Staff API Documentation

## Overview

This document provides comprehensive documentation for all Staff API endpoints in the Lifeline Smart Healthcare System. These endpoints are designed for hospital staff to manage patient check-ins, payments, and view relevant information.

## Authentication

All staff endpoints require authentication using a JWT token. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Staff Endpoints

### 1. Patient Check-In

**Endpoint:** `POST /staff/check-in/:id`  
**Description:** Check in a patient for their visit and create a check-in record

**Parameters:** 
- `id` (integer, required) - Patient ID

**Request Body:**
```json
{
  "check_in_time": "2025-12-01T09:00:00Z",
  "department": "Cardiology",
  "reason_for_visit": "Routine checkup"
}
```

**Response:**
```json
{
  "message": "Patient checked in successfully",
  "patient": {
    "id": 1,
    "user_id": 2,
    "date_of_birth": "1990-01-15",
    "gender": "Male",
    "phone_number": "+1234567890",
    "address": "123 Main St, City, Country",
    "insurance_details": "Insurance Co, Policy #12345",
    "medical_history": "Allergies: Penicillin",
    "emergency_contact": "Jane Doe: +1234567891",
    "created_at": "2025-10-14T10:00:00Z",
    "updated_at": "2025-10-14T10:00:00Z"
  },
  "checkInRecord": {
    "id": 1,
    "patient_id": 1,
    "check_in_time": "2025-12-01T09:00:00Z",
    "department": "Cardiology",
    "reason_for_visit": "Routine checkup",
    "created_at": "2025-12-01T09:00:00Z"
  }
}
```

### 2. Confirm Patient Payment

**Endpoint:** `POST /staff/patients/:id/confirm-payment`  
**Description:** Confirm payment for a patient's visit

**Parameters:** 
- `id` (integer, required) - Patient ID

**Request Body:**
```json
{
  "amount": 150.00,
  "payment_method": "credit_card",
  "description": "Consultation fee"
}
```

**Response:**
```json
{
  "message": "Payment confirmed successfully",
  "payment": {
    "id": 1,
    "patient_id": 1,
    "amount": 150.00,
    "payment_method": "credit_card",
    "payment_status": "confirmed",
    "payment_date": "2025-12-01T09:15:00Z",
    "created_at": "2025-12-01T09:15:00Z",
    "updated_at": "2025-12-01T09:15:00Z"
  }
}
```

### 3. Get Patient Information

**Endpoint:** `GET /staff/patients/:id`  
**Description:** Retrieve comprehensive information for a specific patient including check-in history and user details

**Parameters:** 
- `id` (integer, required) - Patient ID

**Response:**
```json
{
  "id": 1,
  "user_id": 2,
  "date_of_birth": "1990-01-15",
  "gender": "Male",
  "phone_number": "+1234567890",
  "address": "123 Main St, City, Country",
  "insurance_details": "Insurance Co, Policy #12345",
  "medical_history": "Allergies: Penicillin",
  "emergency_contact": "Jane Doe: +1234567891",
  "created_at": "2025-10-14T10:00:00Z",
  "updated_at": "2025-10-14T10:00:00Z",
  "check_ins": [
    {
      "id": 1,
      "check_in_time": "2025-12-01T09:00:00Z",
      "department": "Cardiology",
      "reason_for_visit": "Routine checkup",
      "created_at": "2025-12-01T09:00:00Z"
    }
  ],
  "users": {
    "name": "John Doe",
    "email": "john.doe@example.com",
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

### 4. Get All Patients

**Endpoint:** `GET /staff/patients`  
**Description:** Retrieve information for all patients

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 2,
    "date_of_birth": "1990-01-15",
    "gender": "Male",
    "phone_number": "+1234567890",
    "address": "123 Main St, City, Country",
    "insurance_details": "Insurance Co, Policy #12345",
    "medical_history": "Allergies: Penicillin",
    "emergency_contact": "Jane Doe: +1234567891",
    "created_at": "2025-10-14T10:00:00Z",
    "updated_at": "2025-10-14T10:00:00Z",
    "users": {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_1_1234567890.jpg",
      "phone_number": "+1234567890",
      "date_of_birth": "1990-01-15",
      "gender": "Male",
      "address": "123 Main St, City, Country",
      "emergency_contact": "Jane Doe: +1234567891"
    }
  },
  {
    "id": 2,
    "user_id": 3,
    "date_of_birth": "1985-05-20",
    "gender": "Female",
    "phone_number": "+1234567891",
    "address": "456 Oak Ave, City, Country",
    "insurance_details": "Health Plus, Policy #67890",
    "medical_history": "Diabetes Type 2",
    "emergency_contact": "John Smith: +1234567892",
    "created_at": "2025-10-14T11:00:00Z",
    "updated_at": "2025-10-14T11:00:00Z",
    "users": {
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_2_9876543210.jpg",
      "phone_number": "+1234567891",
      "date_of_birth": "1985-05-20",
      "gender": "Female",
      "address": "456 Oak Ave, City, Country",
      "emergency_contact": "John Smith: +1234567892"
    }
  }
]
```

### 5. Get All Doctors

**Endpoint:** `GET /staff/doctors`  
**Description:** Retrieve information for all doctors

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 4,
    "specialty": "Cardiology",
    "qualification": "MD, Cardiology",
    "schedule": "Monday-Friday: 9AM-5PM",
    "created_at": "2025-10-14T12:00:00Z",
    "updated_at": "2025-10-14T12:00:00Z",
    "users": {
      "name": "Dr. John Smith",
      "email": "john.smith@hospital.com",
      "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_4_1111111111.jpg",
      "phone_number": "+1234567893",
      "date_of_birth": "1980-03-10",
      "gender": "Male",
      "address": "789 Medical Plaza, City, Country",
      "emergency_contact": "Hospital Admin: +1234567894",
      "created_at": "2025-10-14T12:00:00Z",
      "updated_at": "2025-10-14T12:00:00Z"
    }
  },
  {
    "id": 2,
    "user_id": 5,
    "specialty": "Pediatrics",
    "qualification": "MD, Pediatrics",
    "schedule": "Tuesday-Saturday: 8AM-4PM",
    "created_at": "2025-10-14T13:00:00Z",
    "updated_at": "2025-10-14T13:00:00Z",
    "users": {
      "name": "Dr. Emily Johnson",
      "email": "emily.johnson@hospital.com",
      "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_5_2222222222.jpg",
      "phone_number": "+1234567895",
      "date_of_birth": "1982-07-22",
      "gender": "Female",
      "address": "101 Children's Hospital, City, Country",
      "emergency_contact": "Hospital Admin: +1234567894",
      "created_at": "2025-10-14T13:00:00Z",
      "updated_at": "2025-10-14T13:00:00Z"
    }
  }
]
```

### 6. Get Pending Check-Ins

**Endpoint:** `GET /staff/pending-check-ins`  
**Description:** Retrieve patients with confirmed or booked appointments

**Response:**
```json
[
  {
    "id": 1,
    "appointment_date": "2025-12-01T10:00:00Z",
    "status": "confirmed",
    "location": "City Hospital, Main Campus",
    "created_at": "2025-11-25T10:00:00Z",
    "updated_at": "2025-11-25T10:00:00Z",
    "patients": {
      "id": 1,
      "user_id": 2,
      "date_of_birth": "1990-01-15",
      "gender": "Male",
      "phone_number": "+1234567890",
      "address": "123 Main St, City, Country",
      "insurance_details": "Insurance Co, Policy #12345",
      "medical_history": "Allergies: Penicillin",
      "emergency_contact": "Jane Doe: +1234567891",
      "users": {
        "id": 2,
        "name": "John Doe",
        "email": "john.doe@example.com",
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
      "id": 1,
      "user_id": 4,
      "specialty": "Cardiology",
      "qualification": "MD, Cardiology",
      "schedule": "Monday-Friday: 9AM-5PM",
      "users": {
        "id": 4,
        "name": "Dr. John Smith",
        "email": "john.smith@hospital.com",
        "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_4_1111111111.jpg",
        "phone_number": "+1234567893",
        "date_of_birth": "1980-03-10",
        "gender": "Male",
        "address": "789 Medical Plaza, City, Country",
        "emergency_contact": "Hospital Admin: +1234567894",
        "created_at": "2025-10-14T12:00:00Z",
        "updated_at": "2025-10-14T12:00:00Z"
      }
    }
  },
  {
    "id": 2,
    "appointment_date": "2025-12-01T11:30:00Z",
    "status": "booked",
    "location": "City Hospital, Pediatrics Wing",
    "created_at": "2025-11-26T14:00:00Z",
    "updated_at": "2025-11-26T14:00:00Z",
    "patients": {
      "id": 2,
      "user_id": 3,
      "date_of_birth": "2018-03-10",
      "gender": "Female",
      "phone_number": "+1234567891",
      "address": "456 Oak Ave, City, Country",
      "insurance_details": "Children's Health Plus, Policy #11111",
      "medical_history": "Asthma",
      "emergency_contact": "John Smith: +1234567892",
      "users": {
        "id": 3,
        "name": "Emma Smith",
        "email": "emma.smith@example.com",
        "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_3_3333333333.jpg",
        "phone_number": "+1234567891",
        "date_of_birth": "2018-03-10",
        "gender": "Female",
        "address": "456 Oak Ave, City, Country",
        "emergency_contact": "John Smith: +1234567892",
        "created_at": "2025-10-14T11:00:00Z",
        "updated_at": "2025-10-14T11:00:00Z"
      }
    },
    "doctors": {
      "id": 2,
      "user_id": 5,
      "specialty": "Pediatrics",
      "qualification": "MD, Pediatrics",
      "schedule": "Tuesday-Saturday: 8AM-4PM",
      "users": {
        "id": 5,
        "name": "Dr. Emily Johnson",
        "email": "emily.johnson@hospital.com",
        "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_5_2222222222.jpg",
        "phone_number": "+1234567895",
        "date_of_birth": "1982-07-22",
        "gender": "Female",
        "address": "101 Children's Hospital, City, Country",
        "emergency_contact": "Hospital Admin: +1234567894",
        "created_at": "2025-10-14T13:00:00Z",
        "updated_at": "2025-10-14T13:00:00Z"
      }
    }
  }
]
```

### 7. Get Checked-In Patients

**Endpoint:** `GET /staff/checked-in-patients`  
**Description:** Retrieve patients who have been checked in, ordered by check-in time (most recent first)

**Response:**
```json
[
  {
    "id": 1,
    "check_in_time": "2025-12-01T09:00:00Z",
    "department": "Cardiology",
    "reason_for_visit": "Routine checkup",
    "created_at": "2025-12-01T09:00:00Z",
    "patients": {
      "id": 1,
      "user_id": 2,
      "date_of_birth": "1990-01-15",
      "gender": "Male",
      "phone_number": "+1234567890",
      "address": "123 Main St, City, Country",
      "insurance_details": "Insurance Co, Policy #12345",
      "medical_history": "Allergies: Penicillin",
      "emergency_contact": "Jane Doe: +1234567891",
      "users": {
        "id": 2,
        "name": "John Doe",
        "email": "john.doe@example.com",
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
  },
  {
    "id": 2,
    "check_in_time": "2025-12-01T08:30:00Z",
    "department": "Pediatrics",
    "reason_for_visit": "Vaccination",
    "created_at": "2025-12-01T08:30:00Z",
    "patients": {
      "id": 3,
      "user_id": 4,
      "date_of_birth": "2018-03-10",
      "gender": "Female",
      "phone_number": "+1234567891",
      "address": "456 Oak Ave, City, Country",
      "insurance_details": "Children's Health Plus, Policy #11111",
      "medical_history": "Asthma",
      "emergency_contact": "John Smith: +1234567892",
      "users": {
        "id": 4,
        "name": "Emma Smith",
        "email": "emma.smith@example.com",
        "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_3_3333333333.jpg",
        "phone_number": "+1234567891",
        "date_of_birth": "2018-03-10",
        "gender": "Female",
        "address": "456 Oak Ave, City, Country",
        "emergency_contact": "John Smith: +1234567892",
        "created_at": "2025-10-14T11:00:00Z",
        "updated_at": "2025-10-14T11:00:00Z"
      }
    }
  }
]
```

### 8. Get Comprehensive Patient Details by ID

**Endpoint:** `GET /staff/patients/:id/details`  
**Description:** Retrieve comprehensive patient details including personal information, check-in history, appointments, medical records, and payments

**Parameters:** 
- `id` (integer, required) - Patient ID

**Response:**
```json
{
  "id": 1,
  "user_id": 2,
  "date_of_birth": "1990-01-15",
  "gender": "Male",
  "phone_number": "+1234567890",
  "address": "123 Main St, City, Country",
  "insurance_details": "Insurance Co, Policy #12345",
  "medical_history": "Allergies: Penicillin",
  "emergency_contact": "Jane Doe: +1234567891",
  "created_at": "2025-10-14T10:00:00Z",
  "updated_at": "2025-10-14T10:00:00Z",
  "users": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_1_1234567890.jpg",
    "phone_number": "+1234567890",
    "date_of_birth": "1990-01-15",
    "gender": "Male",
    "address": "123 Main St, City, Country",
    "emergency_contact": "Jane Doe: +1234567891",
    "created_at": "2025-10-14T10:00:00Z",
    "updated_at": "2025-10-14T10:00:00Z"
  },
  "check_ins": [
    {
      "id": 1,
      "check_in_time": "2025-12-01T09:00:00Z",
      "department": "Cardiology",
      "reason_for_visit": "Routine checkup",
      "created_at": "2025-12-01T09:00:00Z"
    }
  ],
  "appointments": [
    {
      "id": 1,
      "appointment_date": "2025-12-01T10:00:00Z",
      "status": "confirmed",
      "location": "City Hospital, Main Campus",
      "created_at": "2025-11-25T10:00:00Z",
      "updated_at": "2025-11-25T10:00:00Z",
      "doctors": {
        "id": 1,
        "specialty": "Cardiology",
        "qualification": "MD",
        "users": {
          "name": "Dr. John Smith"
        }
      }
    }
  ],
  "medical_records": [
    {
      "id": 1,
      "diagnosis": "Normal heart function",
      "treatment_plan": "Continue current medication",
      "prescriptions": "Aspirin 81mg daily",
      "record_date": "2025-12-01T10:30:00Z",
      "updated_at": "2025-12-01T10:30:00Z",
      "doctors": {
        "id": 1,
        "specialty": "Cardiology",
        "users": {
          "name": "Dr. John Smith"
        }
      }
    }
  ],
  "payments": [
    {
      "id": 1,
      "amount": 150.00,
      "payment_method": "credit_card",
      "payment_status": "confirmed",
      "payment_date": "2025-12-01T09:15:00Z",
      "created_at": "2025-12-01T09:15:00Z"
    }
  ]
}
```

### 9. Get All Payments

**Endpoint:** `GET /staff/payments`  
**Description:** Retrieve all payments with associated patient details, ordered by creation date (most recent first)

**Response:**
```json
[
  {
    "id": 1,
    "amount": 150.00,
    "payment_method": "credit_card",
    "payment_status": "confirmed",
    "payment_date": "2025-12-01T09:15:00Z",
    "created_at": "2025-12-01T09:15:00Z",
    "updated_at": "2025-12-01T09:15:00Z",
    "patients": {
      "id": 1,
      "user_id": 2,
      "date_of_birth": "1990-01-15",
      "gender": "Male",
      "phone_number": "+1234567890",
      "address": "123 Main St, City, Country",
      "insurance_details": "Insurance Co, Policy #12345",
      "medical_history": "Allergies: Penicillin",
      "emergency_contact": "Jane Doe: +1234567891",
      "users": {
        "id": 2,
        "name": "John Doe",
        "email": "john.doe@example.com",
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
  },
  {
    "id": 2,
    "amount": 75.00,
    "payment_method": "cash",
    "payment_status": "completed",
    "payment_date": "2025-12-01T08:45:00Z",
    "created_at": "2025-12-01T08:45:00Z",
    "updated_at": "2025-12-01T08:45:00Z",
    "patients": {
      "id": 2,
      "user_id": 3,
      "date_of_birth": "1985-05-20",
      "gender": "Female",
      "phone_number": "+1234567891",
      "address": "456 Oak Ave, City, Country",
      "insurance_details": "Health Plus, Policy #67890",
      "medical_history": "Diabetes Type 2",
      "emergency_contact": "John Smith: +1234567892",
      "users": {
        "id": 3,
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "profile_picture_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/profile-pictures/profile_2_9876543210.jpg",
        "phone_number": "+1234567891",
        "date_of_birth": "1985-05-20",
        "gender": "Female",
        "address": "456 Oak Ave, City, Country",
        "emergency_contact": "John Smith: +1234567892",
        "created_at": "2025-10-14T11:00:00Z",
        "updated_at": "2025-10-14T11:00:00Z"
      }
    }
  }
]
```

### 10. Get Payment by ID

**Endpoint:** `GET /staff/payments/:id`  
**Description:** Retrieve a specific payment by ID with associated patient details

**Parameters:** 
- `id` (integer, required) - Payment ID

**Response:**
```json
{
  "id": 1,
  "amount": 150.00,
  "payment_method": "credit_card",
  "payment_status": "confirmed",
  "payment_date": "2025-12-01T09:15:00Z",
  "created_at": "2025-12-01T09:15:00Z",
  "updated_at": "2025-12-01T09:15:00Z",
  "patient_id": 1,
  "patients": {
    "id": 1,
    "user_id": 2,
    "date_of_birth": "1990-01-15",
    "gender": "Male",
    "phone_number": "+1234567890",
    "address": "123 Main St, City, Country",
    "insurance_details": "Insurance Co, Policy #12345",
    "medical_history": "Allergies: Penicillin",
    "emergency_contact": "Jane Doe: +1234567891",
    "users": {
      "id": 2,
      "name": "John Doe",
      "email": "john.doe@example.com",
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
}
```

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**
```json
{
  "error": "Invalid patient ID"
}
```

**401 Unauthorized:**
```json
{
  "error": "Unauthorized access"
}
```

**404 Not Found:**
```json
{
  "error": "Patient not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Database connection failed"
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse. Users are limited to 100 requests per hour.

## Version

Current API version: v1

## Support

For API support, contact the system administrator or refer to the main API documentation.