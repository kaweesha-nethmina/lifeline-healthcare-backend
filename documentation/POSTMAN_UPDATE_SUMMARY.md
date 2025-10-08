# Postman Collection Update Summary

## Overview
This document summarizes the updates made to the Postman collection for the Lifeline Smart Healthcare System to include the new patient endpoints.

## New Endpoints Added

### 1. Get All Doctors
- **Name:** Get All Doctors
- **Method:** GET
- **URL:** `{{base_url}}/patients/doctors`
- **Headers:** 
  - Authorization: Bearer {{auth_token}}
- **Description:** Retrieves all doctors in the system for patient access
- **Response:** Returns an array of doctors with id, user_id, specialty, qualification, and schedule

### 2. Get All Insurance Providers
- **Name:** Get All Insurance Providers
- **Method:** GET
- **URL:** `{{base_url}}/patients/insurance-providers`
- **Headers:** 
  - Authorization: Bearer {{auth_token}}
- **Description:** Retrieves all insurance providers in the system for patient access
- **Response:** Returns an array of insurance providers with user_id, provider_id, name, and email

## Enhanced Endpoints

### Book Appointment
- **Name:** Book Appointment
- **Method:** POST
- **URL:** `{{base_url}}/patients/appointments`
- **Headers:** 
  - Authorization: Bearer {{auth_token}}
- **Description:** Books an appointment with optional location information
- **Request Body:** Accepts optional location field
- **Response:** Includes location information in the response

### Get Appointment History
- **Name:** Get Appointment History
- **Method:** GET
- **URL:** `{{base_url}}/patients/appointments`
- **Headers:** 
  - Authorization: Bearer {{auth_token}}
- **Description:** Retrieves appointment history with doctor names and locations
- **Response:** Includes doctor_name and doctor_location fields

### Update Patient Profile
- **Name:** Update Patient Profile
- **Method:** PUT
- **URL:** `{{base_url}}/patients/profile`
- **Headers:** 
  - Authorization: Bearer {{auth_token}}
- **Description:** Updates patient profile with optional preferred location
- **Request Body:** Accepts optional preferred_location field

### Update Doctor Profile
- **Name:** Update Doctor Profile
- **Method:** PUT
- **URL:** `{{base_url}}/doctors/profile`
- **Headers:** 
  - Authorization: Bearer {{auth_token}}
- **Description:** Updates doctor profile with optional location
- **Request Body:** Accepts optional location field

## File Updated
- **File:** `Lifeline_Healthcare_API.postman_collection.json`
- **Section:** Patients
- **Location:** Added after the "Get Medical Records" endpoint

## Testing
These endpoints can be tested using the existing authentication flow:
1. Register a new user with patient role
2. Login to obtain an authentication token
3. Use the token to access the new endpoints

The endpoints follow the same authentication pattern as other patient endpoints in the system.