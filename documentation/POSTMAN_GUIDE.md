# Postman Collection Guide

## Overview

This guide explains how to use the Postman collection for the Lifeline Smart Healthcare System API. The collection includes all endpoints organized by user role with sample requests and automatic token handling.

## Setup Instructions

### 1. Import the Collection

1. Open Postman
2. Click on "Import" in the top left corner
3. Select the `Lifeline_Healthcare_API.postman_collection.json` file
4. Click "Import"

### 2. Import the Environment

1. In Postman, click on "Import" again
2. Select the `Lifeline_Healthcare_Environment.postman_environment.json` file
3. Click "Import"
4. Select "Lifeline Healthcare Environment" from the environment dropdown in the top right

### 3. Update Environment Variables

1. Click on the environment dropdown and select "Edit"
2. Update the `base_url` variable if your server is running on a different port
3. The `auth_token` variable will be automatically populated after login

## Using the Collection

### 1. Authentication

#### Register a User
1. Navigate to "Authentication" → "Register User"
2. Click "Send" to create a new user
3. Note the user details for login

#### Login
1. Navigate to "Authentication" → "Login User"
2. Update the request body with your user credentials
3. Click "Send" to login
4. The auth token will be automatically saved to your environment

### 2. Patient Workflows

#### Booking an Appointment
1. Login as a patient
2. Navigate to "Patients" → "Book Appointment"
3. Update the request body with doctor ID and appointment date
4. Click "Send" to book the appointment

#### Viewing Medical Records
1. Login as a patient
2. Navigate to "Patients" → "Get Medical Records"
3. Click "Send" to retrieve medical records

### 3. Doctor Workflows

#### Managing Schedule
1. Login as a doctor
2. Navigate to "Doctors" → "Update Doctor Profile"
3. Update the schedule in the request body
4. Click "Send" to update the schedule

#### Creating Medical Records
1. Login as a doctor
2. Navigate to "Doctors" → "Create Medical Record"
3. Update the patient ID and medical information
4. Click "Send" to create the record

### 4. Nurse Workflows

#### Updating Patient Care
1. Login as a nurse
2. Navigate to "Nurses" → "Update Patient Care Information"
3. Update the patient ID and care information
4. Click "Send" to update patient care

### 5. Hospital Staff Workflows

#### Patient Check-In
1. Login as hospital staff
2. Navigate to "Hospital Staff" → "Patient Check-In"
3. Update the patient ID and check-in information
4. Click "Send" to check in the patient

### 6. Admin Workflows

#### Creating Users
1. Login as an admin
2. Navigate to "Admin" → "Create User"
3. Update the user details in the request body
4. Click "Send" to create the user

### 7. Healthcare Manager Workflows

#### Viewing Analytics
1. Login as a healthcare manager
2. Navigate to "Healthcare Managers" → "View Healthcare Data and Analytics"
3. Click "Send" to retrieve analytics data

### 8. System Administrator Workflows

#### Performing Maintenance
1. Login as a system administrator
2. Navigate to "System Administrators" → "Perform System Maintenance"
3. Update the maintenance details
4. Click "Send" to log the maintenance activity

### 9. Insurance Provider Workflows

#### Processing Claims
1. Login as an insurance provider
2. Navigate to "Insurance" → "Process Insurance Claim"
3. Update the claim details
4. Click "Send" to process the claim

## Automatic Token Handling

The collection includes automatic token handling:

1. When you login, the response includes a JWT token
2. The test script in the login request automatically saves this token to the `auth_token` environment variable
3. All protected endpoints use `{{auth_token}}` in the Authorization header
4. The token is automatically used for all subsequent requests

## Environment Variables

### base_url
- Default: `http://localhost:5000`
- Update this if your server is running on a different port or host

### auth_token
- Automatically populated after login
- Used in the Authorization header for protected endpoints

## Troubleshooting

### Token Issues
1. Ensure you've logged in successfully before accessing protected endpoints
2. Check that the test script in the login request is working
3. Verify the `auth_token` variable is populated in your environment

### Connection Issues
1. Ensure the server is running
2. Verify the `base_url` in your environment matches your server address
3. Check that the port is not being used by another application

### Authentication Errors
1. Ensure you're using the correct credentials
2. Check that the user exists in the database
3. Verify that the JWT secret in your `.env` file is correct

## Customizing Requests

### Updating Request Bodies
1. Click on any request
2. Go to the "Body" tab
3. Update the JSON data as needed
4. Click "Send" to make the request

### Adding New Requests
1. Right-click on a folder in the collection
2. Select "Add Request"
3. Configure the request details
4. Save the request

## Best Practices

1. Always login before testing protected endpoints
2. Use appropriate user roles for each workflow
3. Check response status codes and messages
4. Update environment variables when changing servers
5. Use the collection runner for automated testing
6. Export your updated collection to share with team members