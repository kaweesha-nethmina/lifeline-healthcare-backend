# Appointment Endpoints Enhancement

## Overview
This document summarizes the implementation of new appointment endpoints for patients, including update and delete functionality.

## New Endpoints Implemented

### 1. Update Appointment
- **Endpoint:** `PUT /patients/appointments/:id`
- **Description:** Allows patients to update their existing appointments
- **Authentication:** Required (JWT token)
- **Parameters:** 
  - `id` (path parameter) - Appointment ID
- **Request Body:** (All fields optional)
  - `doctor_id` - New doctor ID
  - `appointment_date` - New appointment date
  - `location` - New location
  - `status` - New status (e.g., "rescheduled", "cancelled")

### 2. Delete Appointment
- **Endpoint:** `DELETE /patients/appointments/:id`
- **Description:** Allows patients to delete their existing appointments
- **Authentication:** Required (JWT token)
- **Parameters:** 
  - `id` (path parameter) - Appointment ID

## Implementation Details

### Backend Files Modified

#### 1. Models (`models/Patient.js`)
- Added `updateAppointment` method
- Added `deleteAppointment` method
- Both methods include patient ID verification to ensure patients can only modify their own appointments

#### 2. Controllers (`controllers/patientController.js`)
- Added `updateAppointment` function
- Added `deleteAppointment` function
- Both functions include proper error handling and authentication checks

#### 3. Routes (`routes/patients.js`)
- Added `PUT /appointments/:id` route
- Added `DELETE /appointments/:id` route

### Security Features
1. **Patient Ownership Verification:** All update and delete operations verify that the patient owns the appointment
2. **Authentication Required:** All endpoints require a valid JWT token
3. **Input Validation:** Only specified fields can be updated
4. **Error Handling:** Proper error responses for various failure scenarios

## API Usage Examples

### Update Appointment
```bash
curl -X PUT http://localhost:5000/patients/appointments/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "appointment_date": "2025-12-15T14:00:00Z",
    "location": "Downtown Clinic",
    "status": "rescheduled"
  }'
```

### Delete Appointment
```bash
curl -X DELETE http://localhost:5000/patients/appointments/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Response Formats

### Successful Update
```json
{
  "message": "Appointment updated successfully",
  "data": {
    "id": 1,
    "patient_id": 1,
    "doctor_id": 1,
    "appointment_date": "2025-12-15T14:00:00Z",
    "status": "rescheduled",
    "location": "Downtown Clinic",
    "created_at": "2025-10-15T10:00:00Z",
    "updated_at": "2025-10-15T17:00:00Z"
  }
}
```

### Successful Deletion
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

## Error Handling

### Common Error Responses
1. **404 Not Found:** Appointment not found or doesn't belong to the patient
2. **401 Unauthorized:** Missing or invalid JWT token
3. **500 Internal Server Error:** Database or server errors

### Example Error Response
```json
{
  "error": "Appointment not found"
}
```

## Testing

### Test Scenarios
1. **Valid Update:** Patient updates their own appointment
2. **Valid Deletion:** Patient deletes their own appointment
3. **Unauthorized Access:** Patient tries to update/delete another patient's appointment
4. **Invalid Appointment ID:** Patient tries to update/delete non-existent appointment
5. **Partial Update:** Patient updates only some fields

## Benefits

1. **Complete Appointment Management:** Patients can now fully manage their appointments
2. **Security:** Patient ownership verification prevents unauthorized modifications
3. **Flexibility:** Partial updates allow patients to modify only specific fields
4. **Consistency:** New endpoints follow the same patterns as existing endpoints
5. **Documentation:** Complete API documentation with examples

## Future Considerations

1. **Notification System:** Send notifications to doctors when appointments are updated/cancelled
2. **Audit Trail:** Log appointment changes for tracking purposes
3. **Validation Rules:** Implement business rules (e.g., cannot schedule in the past)
4. **Cascading Deletes:** Handle related records when appointments are deleted