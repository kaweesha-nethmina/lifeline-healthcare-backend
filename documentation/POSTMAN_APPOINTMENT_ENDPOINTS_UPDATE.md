# Postman Collection Appointment Endpoints Update

## Overview
This document summarizes the updates made to the Postman collection to include the new appointment management endpoints for patients.

## New Endpoints Added

### 1. Update Appointment
- **Name:** Update Appointment
- **Method:** PUT
- **URL:** `{{base_url}}/patients/appointments/1`
- **Headers:** 
  - Authorization: Bearer {{auth_token}}
- **Request Body:**
```json
{
  "doctor_id": 1,
  "appointment_date": "2025-12-01T10:00:00Z",
  "location": "City Hospital, Main Campus",
  "status": "rescheduled"
}
```
- **Description:** Updates an existing appointment with the specified ID

### 2. Delete Appointment
- **Name:** Delete Appointment
- **Method:** DELETE
- **URL:** `{{base_url}}/patients/appointments/1`
- **Headers:** 
  - Authorization: Bearer {{auth_token}}
- **Description:** Deletes an existing appointment with the specified ID

## Implementation Details

### Request Structure
1. **Authentication:** Both endpoints require a valid JWT token in the Authorization header
2. **Path Parameters:** Both endpoints use the appointment ID as a path parameter
3. **Request Body:** Update endpoint accepts a JSON body with optional fields
4. **Response Format:** Standard JSON responses with success messages

### Update Appointment Request Body
The update appointment endpoint accepts any combination of the following fields:
- `doctor_id` - New doctor ID for the appointment
- `appointment_date` - New date/time for the appointment
- `location` - New location for the appointment
- `status` - New status for the appointment (e.g., "rescheduled", "cancelled")

All fields are optional, allowing for partial updates.

### Security Features
1. **Authentication Required:** Both endpoints require a valid JWT token
2. **Path Parameter:** Appointment ID is required in the URL path
3. **Backend Validation:** The backend verifies that the patient owns the appointment

## Testing Scenarios

### Valid Update
1. Send PUT request to `/patients/appointments/1` with valid JWT token
2. Include updated appointment data in request body
3. Expect 200 OK response with updated appointment data

### Valid Deletion
1. Send DELETE request to `/patients/appointments/1` with valid JWT token
2. Expect 200 OK response with deleted appointment data

### Invalid Authentication
1. Send request without JWT token or with invalid token
2. Expect 401 Unauthorized response

### Non-existent Appointment
1. Send request with valid JWT token but non-existent appointment ID
2. Expect 404 Not Found response

### Unauthorized Access
1. Send request with valid JWT token for an appointment that doesn't belong to the patient
2. Expect 404 Not Found response (to prevent information disclosure)

## Benefits

1. **Complete Testing Coverage:** Postman collection now includes all appointment management endpoints
2. **Consistent Structure:** New endpoints follow the same naming and organization conventions
3. **Clear Documentation:** Each endpoint includes example request bodies and descriptions
4. **Easy Testing:** Ready-to-use requests that can be executed with minimal modification

## Usage Instructions

### Setting up Authentication
1. Execute the "Login User" request to obtain a JWT token
2. The test script automatically saves the token to the `auth_token` environment variable
3. All appointment endpoints will automatically use this token

### Testing Update Endpoint
1. Modify the appointment ID in the URL if needed
2. Update the request body with desired changes
3. Execute the request

### Testing Delete Endpoint
1. Modify the appointment ID in the URL if needed
2. Execute the request

## Future Considerations

1. **Environment Variables:** Consider using environment variables for appointment IDs
2. **Test Scripts:** Add test scripts to verify response data
3. **Collections:** Organize requests into folders for better management
4. **Examples:** Add more example requests for different scenarios