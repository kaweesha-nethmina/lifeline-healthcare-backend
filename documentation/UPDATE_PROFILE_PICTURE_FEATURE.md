# Update Profile Picture Feature

This document describes the implementation of the update profile picture feature.

## Feature Overview

The update profile picture feature allows users to replace their existing profile picture with a new one. This feature:
1. Deletes the existing profile picture from storage (if one exists)
2. Uploads the new profile picture to storage
3. Updates the user's profile with the new picture URL

## Implementation Details

### 1. Controller Changes

Added a new `updateProfilePicture` function in `controllers/userController.js`:
- Checks if a file was uploaded
- Retrieves the user's current profile to check for an existing profile picture
- Deletes the existing profile picture from Supabase storage (if it exists)
- Uploads the new profile picture with a unique filename
- Updates the user's profile with the new picture URL

### 2. Route Changes

Updated `routes/users.js` to include:
- `PUT /users/profile/picture` - Update own profile picture
- `PUT /users/profile/picture/:userId` - Update any user's profile picture (admin only)

### 3. Postman Collection Updates

Updated the Postman collection to include:
- "Update Profile Picture" request in the "Profile Pictures" folder
- "Update Any User's Profile Picture (Admin Only)" request in the "Profile Pictures" folder

## API Endpoints

### Update Own Profile Picture
- **Method**: PUT
- **URL**: `/users/profile/picture`
- **Headers**: 
  - Authorization: Bearer {token}
- **Body**: form-data with `profilePicture` field containing the image file

### Update Any User's Profile Picture (Admin Only)
- **Method**: PUT
- **URL**: `/users/profile/picture/:userId`
- **Headers**: 
  - Authorization: Bearer {token}
- **Body**: form-data with `profilePicture` field containing the image file

## How It Works

1. When a user sends a PUT request to update their profile picture:
   - The system first checks if the user has an existing profile picture
   - If an existing picture is found, it's deleted from Supabase storage
   - The new picture is uploaded to Supabase storage with a unique filename
   - The user's profile is updated with the new picture URL

2. For admin users updating another user's profile picture:
   - The same process occurs but with the specified user ID
   - Only admin users can access this endpoint

## Error Handling

The implementation includes comprehensive error handling:
- File upload validation
- Storage operation errors
- Database update errors
- Permission validation

## Security Considerations

1. Only authenticated users can update their own profile pictures
2. Only admin users can update other users' profile pictures
3. Existing profile pictures are properly deleted from storage
4. New profile pictures are stored with unique filenames to prevent conflicts

## Testing

The updated Postman collection includes requests to test:
1. Updating your own profile picture
2. Admin updating another user's profile picture