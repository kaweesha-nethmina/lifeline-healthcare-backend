# Profile Picture Functionality Implementation

This document explains how to set up and use the profile picture functionality in the Lifeline Smart Healthcare System.

## Overview

The profile picture functionality allows users to:
1. Upload profile pictures
2. Retrieve their own profile picture
3. Delete their own profile picture
4. Admin users can manage any user's profile picture

## Implementation Details

### 1. Database Schema

The `users` table has been updated with a `profile_picture_url` column to store the URL of the user's profile picture:

```sql
ALTER TABLE users 
ADD COLUMN profile_picture_url TEXT;

COMMENT ON COLUMN users.profile_picture_url IS 'URL to the user''s profile picture stored in Supabase storage';
```

### 2. API Endpoints

#### User Profile Endpoints (Include Profile Picture)
- `GET /users/profile` - Get user profile (now includes profile picture URL)
- `PUT /users/profile` - Update user profile
- `GET /patients/profile` - Get patient profile (now includes profile picture URL)
- `PUT /patients/profile` - Update patient profile
- `GET /doctors/profile` - Get doctor profile (now includes profile picture URL)
- `PUT /doctors/profile` - Update doctor profile

#### Profile Picture CRUD Endpoints
- `POST /users/profile/picture` - Upload profile picture
- `GET /users/profile/picture` - Get own profile picture URL
- `DELETE /users/profile/picture` - Delete own profile picture
- `GET /users/profile/picture/:userId` - Get any user's profile picture URL (admin only)
- `DELETE /users/profile/picture/:userId` - Delete any user's profile picture (admin only)

### 3. Models

#### User Model
The User model includes methods for profile picture management:
- `getProfilePicture(userId)` - Get profile picture URL
- `updateProfilePicture(userId, profilePictureUrl)` - Update profile picture URL
- `deleteProfilePicture(userId)` - Delete profile picture URL

#### Patient Model
The Patient model has been updated to include user details (including profile picture) when getting the profile:
- `getProfile(userId)` - Returns patient data with embedded user details including profile picture

### 4. Controllers

#### User Controller
Handles profile picture CRUD operations:
- `uploadProfilePicture` - Uploads a new profile picture
- `getProfilePicture` - Retrieves profile picture URL
- `deleteProfilePicture` - Deletes profile picture

#### Patient Controller
Updated to include profile picture in profile responses:
- `getPatientProfile` - Returns patient profile with user details including profile picture

#### Doctor Controller
Updated to include profile picture in profile responses:
- `getDoctorProfile` - Returns doctor profile with user details including profile picture

### 5. Storage Utilities

The storage utilities handle file operations with Supabase storage:
- `uploadFile` - Uploads a file to Supabase storage
- `deleteFile` - Deletes a file from Supabase storage
- `getFileUrl` - Gets the public URL of a file

### 6. Middleware

Role-based middleware controls access to admin-only endpoints:
- `roleMiddleware` - Ensures only authorized roles can access specific endpoints

## Setup Instructions

### 1. Database Migration

Run the migration file to add the profile picture column:
```sql
-- Add profile picture column to users table
ALTER TABLE users 
ADD COLUMN profile_picture_url TEXT;

-- Add a comment to describe the purpose of the column
COMMENT ON COLUMN users.profile_picture_url IS 'URL to the user''s profile picture stored in Supabase storage';
```

### 2. Supabase Storage Configuration

Follow the instructions in `SUPABASE_STORAGE_FIX.md` to:
1. Create the `profile-pictures` bucket
2. Configure the necessary storage policies
3. Ensure proper permissions

### 3. Environment Variables

Ensure your `.env` file contains the correct Supabase credentials:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_key  # IMPORTANT: Use the SERVICE KEY, not the anon key
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

**IMPORTANT**: You must use the **service key** (not the anon key) for backend operations. The service key has full permissions needed for storage operations.

## Usage Examples

### Uploading a Profile Picture

Send a POST request to `/users/profile/picture` with a form-data body containing:
- Key: `profilePicture`
- Value: The image file

### Getting a Profile Picture

Send a GET request to `/users/profile/picture` to get your own profile picture URL.

### Deleting a Profile Picture

Send a DELETE request to `/users/profile/picture` to delete your own profile picture.

### Admin Operations

Admin users can:
- GET `/users/profile/picture/:userId` - Get any user's profile picture URL
- DELETE `/users/profile/picture/:userId` - Delete any user's profile picture

## Testing with Postman

The updated Postman collection includes:
1. A "Users" folder with profile endpoints
2. A "Profile Pictures" folder with all CRUD operations
3. Proper authentication headers for all requests

## Error Handling

The implementation includes comprehensive error handling:
- File upload errors
- Storage permission errors
- Database errors
- Authentication/authorization errors

## Security Considerations

1. Only authenticated users can manage their own profile pictures
2. Only admin users can manage other users' profile pictures
3. Profile pictures are stored in a public bucket with unique filenames
4. Old profile pictures are automatically deleted from storage when replaced

## Troubleshooting

### Common Issues

1. **Row-level security policy error**: Follow the instructions in `SUPABASE_STORAGE_FIX.md`
2. **Bucket not found error**: Check that you're using the service key, not the anon key
3. **File not found**: Verify the bucket name and file path
4. **Permission denied**: Check Supabase service key permissions
5. **Profile picture not showing**: Verify the URL is correctly stored in the database

### Debugging Steps

1. Check Supabase logs for detailed error messages
2. Verify environment variables are correctly set
3. Ensure you're using the service key (not anon key) in your `.env` file
4. Test storage operations directly in the Supabase dashboard
5. Ensure the migration has been applied to the database

### Key Points to Remember

1. **Always use the service key** for backend operations
2. **Create the `profile-pictures` bucket** in your Supabase storage
3. **Set proper storage policies** for the bucket
4. **Restart your server** after changing environment variables