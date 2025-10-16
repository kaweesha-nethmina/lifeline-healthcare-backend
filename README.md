# Lifeline Smart Healthcare System

## Overview

The Lifeline Smart Healthcare System is a comprehensive backend solution built with Node.js, Express.js, and Supabase. This system provides digital management for patient records, appointments, payments, emergencies, and more, supporting 8 distinct user roles with their specific functionalities.

## Project Structure

```
/lifeline-healthcare-backend
├── /config
├── /controllers
├── /documentation
├── /models
├── /postman
├── /routes
├── /tests
├── /middlewares
├── /utils
├── server.js
├── .env
└── package.json
```

## Directory Structure

- **`/config`** - Configuration files
- **`/controllers`** - Controller functions for handling requests
- **`/documentation`** - All project documentation files
- **`/models`** - Database models and business logic
- **`/postman`** - Postman collections and environment files
- **`/routes`** - API route definitions
- **`/tests`** - Test files and scripts
- **`/middlewares`** - Custom middleware functions
- **`/utils`** - Utility functions and helpers

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase project and update `.env` file with your credentials
4. Run the database setup SQL commands from `documentation/SUPABASE_SETUP.md`
5. Start the server: `npm run dev`

## Environment Variables

Create a `.env` file with the following variables:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

Or to run specific tests:
```bash
node tests/test_filename.js
```

## API Documentation

For comprehensive API documentation with all endpoints, request/response examples, and data flow information, please refer to:
- `documentation/API_DOCUMENTATION.md` - Complete API documentation
- `documentation/STAFF_API_DOCUMENTATION.md` - Specific documentation for staff endpoints

## Postman Collections

The `postman` directory contains all Postman collections and environment files for testing the API endpoints.

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