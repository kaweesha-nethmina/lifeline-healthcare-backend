# Fixing Supabase Service Key Configuration

The error "Storage upload failed: Bucket 'profile-pictures' does not exist" is likely caused by using the wrong Supabase key. You're currently using the **anon key** which has limited permissions. You need to use the **service key** for backend operations.

## 1. Get the Correct Service Key

1. Log in to your Supabase dashboard
2. Select your project
3. Go to **Settings** → **API**
4. In the **Project API keys** section, find the **service_role** key
5. Copy the service key (it starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 2. Update Your Environment Variables

Update your `.env` file with the correct service key:

```env
SUPABASE_URL=https://vmvrdwueiohofhijsixa.supabase.co
SUPABASE_KEY=your_service_role_key_here  # Replace with the service key
JWT_SECRET=gww+VTVxjai5ZNlBeMyovsLfuDqEYogTn3aNMiIRgcyxAp3HkvA+lYaiqt171se1VwfWYaFRu2jUceioxxYNgg==
PORT=5000
```

## 3. Difference Between Keys

- **anon key**: Limited permissions, used for client-side operations
- **service key**: Full permissions, used for backend/server operations

For backend operations like file uploads, you **must** use the service key.

## 4. Verify the Key

The service key:
- Has full access to all Supabase services
- Should be kept secret and never exposed to clients
- Is used only in backend/server code
- Allows storage operations like uploading and deleting files

## 5. Restart Your Server

After updating the environment variables:
1. Stop your server (Ctrl+C)
2. Start your server again (`node server.js`)

## 6. Test the Fix

Try uploading a profile picture again. The error should be resolved.

## 7. Security Note

Never expose your service key in client-side code. It should only be used in backend/server environments.