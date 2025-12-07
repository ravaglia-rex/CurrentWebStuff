import { supabase } from '@/lib/customSupabaseClient';

/**
 * Uploads a file to a dedicated folder for an application in Supabase storage.
 *
 * @param {object} params - The parameters for the upload.
 * @param {string} params.appId - The ID of the application.
 * @param {File} params.file - The file object to upload.
 * @param {string} params.field - The field name (e.g., 'transcript', 'video').
 * @returns {Promise<string>} The public URL of the uploaded file.
 * @throws {Error} If the upload fails.
 */
export async function uploadApplicationFile({ appId, file, field }) {
  if (!file || !appId || !field) {
    throw new Error('Missing required parameters for file upload.');
  }

  // Sanitize filename to remove special characters that might cause issues in URL paths
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const filePath = `applications/${appId}/${field}-${Date.now()}-${cleanFileName}`;

  const { error: uploadError } = await supabase.storage
    .from('ausaweb') // Assuming 'ausaweb' is your public bucket for application assets
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    throw new Error(`Failed to upload ${field}.`);
  }

  const { data } = supabase.storage
    .from('ausaweb')
    .getPublicUrl(filePath);

  if (!data || !data.publicUrl) {
    console.error('Error getting public URL for:', filePath);
    throw new Error(`Could not get public URL for uploaded ${field}.`);
  }

  return data.publicUrl;
}