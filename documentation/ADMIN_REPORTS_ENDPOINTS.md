# Admin Reports Endpoints

This document summarizes the new admin endpoints for generating and viewing reports.

## 1. Monthly User Activity Report

### Endpoint
```
GET /admin/reports/users/activity
```

### Description
Generates a monthly user activity report including user registrations, appointments, and medical records.

### Query Parameters
- `month` (required): The month for the report (1-12)
- `year` (required): The year for the report (e.g., 2025)

### Response Example
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

## 2. Appointment Statistics

### Endpoint
```
GET /admin/reports/appointments/statistics
```

### Description
Provides comprehensive statistics about appointments including status distribution and monthly trends.

### Response Example
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

## 3. Medical Records Summary

### Endpoint
```
GET /admin/reports/medical-records/summary
```

### Description
Provides a summary of medical records including total count, recent records, and top diagnoses.

### Response Example
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

## Implementation Files

The following files were modified to implement these endpoints:

1. `models/Admin.js` - Added new methods for report generation
2. `controllers/adminController.js` - Added controller functions for the new endpoints
3. `routes/admin.js` - Added routes for the new endpoints
4. `API_DOCUMENTATION.md` - Updated API documentation
5. `Lifeline_Healthcare_API_Complete.postman_collection.json` - Updated Postman collection