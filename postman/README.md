# Postman Collections

This directory contains all the Postman collection files for the Lifeline Smart Healthcare System.

## Contents

- `Lifeline_Healthcare_API.postman_collection.json` - Basic API collection
- `Lifeline_Healthcare_API_Complete.postman_collection.json` - Complete API collection with all endpoints
- `Lifeline_Healthcare_API_Updated.postman_collection.json` - Updated collection with additional endpoints
- `Lifeline_Healthcare_API_Updated_With_Staff.postman_collection.json` - Collection with staff endpoints
- `Lifeline_Healthcare_API_Updated_with_Admin_Appointments.postman_collection.json` - Collection with admin appointment endpoints
- `Lifeline_Healthcare_Environment.postman_environment.json` - Environment configuration

## Purpose

This directory organizes all Postman collections and environment files, making it easy to import and test the API endpoints. These collections can be imported into Postman to quickly test all API endpoints with pre-configured requests.

## Using the Collections

1. Open Postman
2. Click on "Import" button
3. Select the desired collection JSON file from this directory
4. Import the environment file if needed
5. Configure the environment variables (base_url, auth_token)
6. Start testing the endpoints

## Environment Variables

- `base_url` - The base URL of your API server (default: http://localhost:5000)
- `auth_token` - JWT token for authenticated requests