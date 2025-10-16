# Profile Picture Setup Guide

This guide explains how to set up Supabase storage for profile pictures in the Lifeline Smart Healthcare System.

## Prerequisites

1. Supabase account and project
2. Supabase URL and service key
3. Environment variables configured in your `.env` file

## Setting up Supabase Storage Bucket

### 1. Create the Storage Bucket

1. Log in to your Supabase dashboard
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **Create Bucket**
5. Set the bucket name to `profile-pictures`
6. Set the bucket to **Public** (so profile pictures can be accessed publicly)
7. Click **Create Bucket**

### 2. Configure Bucket Permissions

1. In the Storage section, click on your `profile-pictures` bucket
2. Click on the **Policies** tab
3. Ensure the following policies are set:

**Select Policy:**
```sql
SELECT ("storage"."objects"."bucket_id" = 'profile-pictures')
```

**Insert Policy:**
```sql
INSERT ("storage"."objects"."bucket_id" = 'profile-pictures')
```

**Update Policy:**
```sql
UPDATE ("storage"."objects"."bucket_id" = 'profile-pictures')
```

**Delete Policy:**
```sql
DELETE ("storage"."objects"."bucket_id" = 'profile-pictures')
```

### 3. Environment Variables

Ensure your `.env` file contains the following variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
JWT_SECRET=your_jwt_secret
```

## API Endpoints

The following endpoints are available for profile picture management:

### User Profile Picture Endpoints

- `POST /users/profile/picture` - Upload profile picture
- `GET /users/profile/picture` - Get own profile picture
- `DELETE /users/profile/picture` - Delete own profile picture

### Admin Profile Picture Endpoints

- `GET /users/profile/picture/:userId` - Get any user's profile picture (admin only)
- `DELETE /users/profile/picture/:userId` - Delete any user's profile picture (admin only)

## Usage Examples

### Uploading a Profile Picture

Send a POST request to `/users/profile/picture` with a form-data body containing:
- Key: `profilePicture`
- Value: The image file

### Getting a Profile Picture

Send a GET request to `/users/profile/picture` to get your own profile picture URL.

### Deleting a Profile Picture

Send a DELETE request to `/users/profile/picture` to delete your own profile picture.

## Testing with Postman

The updated Postman collection includes requests for all profile picture endpoints in the "Users" folder.

1. Import the `Lifeline_Healthcare_API_Updated.postman_collection.json` file into Postman
2. Set up your environment variables:
   - `base_url`: Your server URL (e.g., http://localhost:5000)
   - `auth_token`: Your JWT token obtained from the login endpoint
3. Test the profile picture endpoints in the "Users" folder

## Database Migration

A database migration file has been created to add the `profile_picture_url` column to the `users` table:

- File: `db/migrations/002_add_profile_picture_to_users.sql`

Run this migration to update your database schema.

## Security Notes

1. Profile pictures are stored in a public bucket but have unique filenames
2. Only authenticated users can upload/delete their own profile pictures
3. Only admins can manage other users' profile pictures
4. Old profile pictures are automatically deleted from storage when replaced or removed