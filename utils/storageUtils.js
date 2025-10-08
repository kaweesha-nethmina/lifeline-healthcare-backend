const supabase = require('../db');

// Upload a file to Supabase storage
const uploadFile = async (fileBuffer, fileName, bucketName = 'profile-pictures') => {
  try {
    // Try to upload the file directly without checking bucket existence
    // This avoids potential permission issues with listing buckets
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload(fileName, fileBuffer, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Upload error:', error);
      // If it's a bucket not found error, provide more specific guidance
      if (error.message && error.message.includes('not found')) {
        throw new Error(`Bucket '${bucketName}' not found. Please create the bucket in your Supabase storage.`);
      }
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get the public URL of the uploaded file
    const { data: { publicUrl } } = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (err) {
    console.error('Storage upload error:', err);
    throw new Error(`Storage upload failed: ${err.message}`);
  }
};

// Delete a file from Supabase storage
const deleteFile = async (fileName, bucketName = 'profile-pictures') => {
  try {
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .remove([fileName]);

    if (error) {
      console.error('Delete error:', error);
      throw new Error(`Delete failed: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error('Storage delete error:', err);
    throw new Error(`Storage delete failed: ${err.message}`);
  }
};

// Get file URL from Supabase storage
const getFileUrl = async (fileName, bucketName = 'profile-pictures') => {
  try {
    const { data } = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (err) {
    console.error('Get file URL error:', err);
    throw new Error(`Get file URL failed: ${err.message}`);
  }
};

module.exports = {
  uploadFile,
  deleteFile,
  getFileUrl
};