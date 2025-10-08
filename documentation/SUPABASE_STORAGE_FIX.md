# Fixing Supabase Storage Row-Level Security Policy Error

The error "new row violates row-level security policy" or "Bucket 'profile-pictures' does not exist" occurs when trying to upload files to Supabase storage without proper permissions. Follow these steps to fix the issue:

## 1. Verify the Storage Bucket

1. Log in to your Supabase dashboard
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Verify that a bucket named `profile-pictures` exists
5. If it doesn't exist, create it:
   - Click **Create Bucket**
   - Set the bucket name to `profile-pictures`
   - Set the bucket to **Public** (so profile pictures can be accessed publicly)
   - Click **Create Bucket**

## 2. Configure Bucket Permissions

1. In the Storage section, click on your `profile-pictures` bucket
2. Click on the **Policies** tab
3. Create or update the following policies:

### Authenticated Users Policy (Recommended)
This policy allows authenticated users to manage their own files:

```sql
-- Allow authenticated users to select (read) files
SELECT (
  bucket_id = 'profile-pictures' 
  AND (auth.role() = 'authenticated')
)

-- Allow authenticated users to insert (upload) files
INSERT (
  bucket_id = 'profile-pictures' 
  AND (auth.role() = 'authenticated')
)

-- Allow authenticated users to update their own files
UPDATE (
  bucket_id = 'profile-pictures' 
  AND (auth.role() = 'authenticated')
  AND ((storage.foldername(name))[1] = (auth.uid())::text)
)

-- Allow authenticated users to delete their own files
DELETE (
  bucket_id = 'profile-pictures' 
  AND (auth.role() = 'authenticated')
  AND ((storage.foldername(name))[1] = (auth.uid())::text)
)
```

### Alternative: Simple Policy (For Testing)
If the above policies don't work, try these simpler policies:

```sql
-- Select Policy
SELECT true

-- Insert Policy
INSERT true

-- Update Policy
UPDATE true

-- Delete Policy
DELETE true
```

## 3. Check Service Key Permissions

Ensure your Supabase service key has the necessary permissions:
1. Go to **Settings** → **API**
2. Check that your service key has full access to storage
3. For backend operations, you should use the **service key** (not the anon key)

## 4. Environment Variables

Ensure your `.env` file contains the correct Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_key  # Use the service key, not the anon key
JWT_SECRET=your_jwt_secret_key
```

## 5. Test the Fix

After configuring the policies:
1. Restart your server
2. Try uploading a profile picture again

## 6. Advanced Troubleshooting

### Check Bucket Access with SQL
You can verify bucket access by running this SQL query in the Supabase SQL editor:

```sql
SELECT * FROM storage.buckets WHERE id = 'profile-pictures';
```

### Check Storage Policies
Verify that policies are correctly applied:

```sql
SELECT * FROM storage.policies WHERE bucket_id = 'profile-pictures';
```

## 7. Common Issues and Solutions

### Issue: "Bucket 'profile-pictures' does not exist"
**Solution:** 
1. Verify the exact bucket name (case-sensitive)
2. Ensure you're using the service key in your backend
3. Check that the bucket is properly created in the Supabase dashboard

### Issue: "new row violates row-level security policy"
**Solution:**
1. Check that all required policies are created
2. Ensure the policies allow the operations you're trying to perform
3. Verify that your service key has the necessary permissions

### Issue: "Permission denied"
**Solution:**
1. Make sure you're using the service role key (not the anon key)
2. Check that the policies are correctly configured
3. Verify the bucket is set to public if needed

## 8. Testing with Postman

Use the updated Postman collection to test the profile picture endpoints:
1. Authenticate with a valid user
2. Use the "Upload Profile Picture" endpoint in the "Profile Pictures" folder
3. Select a valid image file for upload

## 9. Verification

After fixing the policies, you should be able to:
1. Upload profile pictures successfully
2. Retrieve profile picture URLs
3. Delete profile pictures
4. Admin users should be able to manage any user's profile picture

## 10. Additional Notes

- Profile pictures are stored with unique filenames to prevent conflicts
- Old profile pictures are automatically deleted from storage when replaced
- The system uses the service key for backend operations to ensure proper permissions
- All file operations are logged for debugging purposes