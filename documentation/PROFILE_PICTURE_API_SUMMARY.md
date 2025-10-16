# Profile Picture API Summary

This document provides a summary of the profile picture API endpoints that have been implemented in the Lifeline Smart Healthcare System.

## Overview

The profile picture functionality allows users to:
1. Upload a new profile picture
2. Update their existing profile picture
3. Retrieve their profile picture URL
4. Delete their profile picture
5. Admin users can perform all operations on any user's profile picture

## API Endpoints

### User Profile Endpoints (Include Profile Picture)
- `GET /users/profile` - Get user profile (includes profile picture URL)
- `PUT /users/profile` - Update user profile (excluding profile picture)

### Profile Picture CRUD Endpoints

#### For Authenticated Users (Own Profile Picture)
- `POST /users/profile/picture` - Upload a new profile picture
- `PUT /users/profile/picture` - Update (replace) existing profile picture
- `GET /users/profile/picture` - Get own profile picture URL
- `DELETE /users/profile/picture` - Delete own profile picture

#### For Admin Users (Any User's Profile Picture)
- `GET /users/profile/picture/:userId` - Get any user's profile picture URL
- `PUT /users/profile/picture/:userId` - Update any user's profile picture
- `DELETE /users/profile/picture/:userId` - Delete any user's profile picture

## Database Changes

A new column has been added to the `users` table:
```sql
ALTER TABLE users 
ADD COLUMN profile_picture_url TEXT;

COMMENT ON COLUMN users.profile_picture_url IS 'URL to the user''s profile picture stored in Supabase storage';
```

## Storage

Profile pictures are stored in Supabase storage in a bucket named `profile-pictures` with:
- Public access for reading profile pictures
- Unique filenames to prevent conflicts
- Automatic cleanup when pictures are replaced or deleted

## Security

- Only authenticated users can manage their own profile pictures
- Only admin users can manage other users' profile pictures
- All operations are protected by JWT authentication
- File operations are handled securely through Supabase storage APIs

## Error Handling

The API includes comprehensive error handling for:
- Missing or invalid authentication tokens
- Unauthorized access attempts
- File upload failures
- Storage operation errors
- Database update errors

## Testing

All endpoints have been added to the Postman collection in the "Profile Pictures" folder with:
- Proper authentication headers
- Sample requests for all operations
- Admin-only endpoints clearly marked