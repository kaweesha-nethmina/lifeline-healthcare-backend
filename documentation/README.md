# Lifeline Smart Healthcare System

## Overview

The Lifeline Smart Healthcare System is a comprehensive backend solution built with Node.js, Express.js, and Supabase. This system provides digital management for patient records, appointments, payments, emergencies, and more, supporting 8 distinct user roles with their specific functionalities.

## User Roles and Functionalities

### 1. Patients
- Book appointments
- Access medical records
- Manage e-prescriptions

### 2. Doctors
- Manage schedules
- View and update patient records
- Issue e-prescriptions

### 3. Nurses
- Monitor patient care
- Assist doctors
- Update treatment plans

### 4. Hospital Staff
- Assist with patient check-ins
- Handle payments
- Update records

### 5. Admins
- Manage system settings
- Configure departments
- Manage user roles

### 6. Healthcare Managers
- Analyze data for operational efficiency
- Resource planning
- View healthcare metrics

### 7. System Administrators
- Maintain system
- Manage backups
- Handle user permissions

### 8. Insurance Providers
- Process insurance claims
- Verify coverage
- Manage patient eligibility

## Project Structure

```
/lifeline-healthcare-backend
├── /config
├── /controllers
├── /models
├── /routes
├── /middlewares
├── /utils
├── server.js
├── .env
└── package.json
```

## API Endpoints

**For comprehensive API documentation with all endpoints, request/response examples, and data flow information, please refer to [API_DOCUMENTATION.md](API_DOCUMENTATION.md).**

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Patients
- `GET /patients/profile` - Get patient profile
- `PUT /patients/profile` - Update patient profile
- `POST /patients/appointments` - Book appointment
- `GET /patients/appointments` - Get appointment history
- `GET /patients/medical-records` - Get medical records

### Doctors
- `GET /doctors/profile` - Get doctor profile
- `PUT /doctors/profile` - Update doctor profile
- `GET /doctors/patients/:id/medical-records` - View patient medical records
- `POST /doctors/patients/:id/medical-records` - Create medical record
- `GET /doctors/appointments` - Get appointment schedule

### Nurses
- `POST /nurses/patients/:id/care` - Update patient care information
- `GET /nurses/patients/:id/care` - Get patient care history

### Hospital Staff
- `POST /staff/check-in/:id` - Patient check-in
- `GET /staff/patients/:id` - Get patient information

### Admin
- `POST /admin/create-user` - Create user
- `POST /admin/configure-system` - Configure system
- `GET /admin/users` - Get all users

### Healthcare Managers
- `GET /manager/data` - View healthcare data and analytics
- `GET /manager/resources` - Get resource utilization

### System Administrators
- `POST /system-admin/system-maintenance` - System maintenance
- `GET /system-admin/logs` - Monitor system logs
- `POST /system-admin/backup` - Create system backup

### Emergency
- `POST /emergency/emergency` - Log emergency case
- `POST /emergency/resources` - Create emergency resource
- `GET /emergency/resources` - View available resources
- `GET /emergency/cases` - Get all emergency cases
- `PUT /emergency/cases/:id` - Update emergency case status

### Payments
- `POST /payments/process-payment` - Process payment
- `GET /payments/payment-history/:patientId` - Get payment history
- `GET /payments/:id` - Get payment by ID

### Insurance
- `POST /insurance/verify-eligibility` - Verify insurance eligibility
- `POST /insurance/process-claim` - Process insurance claim
- `GET /insurance/providers` - Get insurance providers
- `GET /insurance/claims/:patientId` - Get patient insurance claims

### Prescriptions
- `POST /prescriptions` - Create prescription
- `GET /prescriptions/medical-record/:medicalRecordId` - Get prescriptions by medical record
- `PUT /prescriptions/:id` - Update prescription
- `DELETE /prescriptions/:id` - Delete prescription

### Notifications
- `GET /notifications` - Get user notifications
- `POST /notifications` - Create notification
- `PUT /notifications/:id/status` - Update notification status
- `PUT /notifications/:id/read` - Mark notification as read
- `DELETE /notifications/:id` - Delete notification

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase project and update `.env` file with your credentials
4. Run the database setup SQL commands from `SUPABASE_SETUP.md`
5. Start the server: `npm run dev`

## Environment Variables

Create a `.env` file with the following variables:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Testing

Use the provided Postman collection `Lifeline_Healthcare_API.postman_collection.json` to test all API endpoints.

## Security

- JWT-based authentication for role-based access control
- Password hashing for user security
- Environment variable configuration for sensitive data

## Error Handling

All endpoints include proper error handling for:
- Database errors
- Validation errors
- Unauthorized access
- Missing resources

## Data Validation

- Appointment slot availability validation
- Patient medical records data validation
- Valid data input validation (e.g., numeric values for vitals)

# Documentation

This directory contains all the documentation files for the Lifeline Smart Healthcare System.

## Contents

- `API_DOCUMENTATION.md` - Complete API documentation for all endpoints
- `README.md` - Main project README file
- `SUPABASE_SETUP.md` - Instructions for setting up the Supabase database
- `STAFF_API_DOCUMENTATION.md` - Specific documentation for staff endpoints
- Various implementation summary and enhancement documents
- SQL files for database setup

## Purpose

This directory organizes all documentation related to the project, making it easy to find information about the system architecture, API endpoints, database schema, and implementation details.
