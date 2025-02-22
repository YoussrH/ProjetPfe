import cloudinary from '@/lib/cloudinary';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const file = req.body.image; // Base64 image from frontend

      const uploadResponse = await cloudinary.uploader.upload(file, {
        folder: 'products', // Folder in Cloudinary
      });

      res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      res.status(500).json({ error: 'Image upload failed' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
