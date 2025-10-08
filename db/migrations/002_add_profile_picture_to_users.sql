-- Add profile picture column to users table
ALTER TABLE users 
ADD COLUMN profile_picture_url TEXT;

-- Add a comment to describe the purpose of the column
COMMENT ON COLUMN users.profile_picture_url IS 'URL to the user''s profile picture stored in Supabase storage';