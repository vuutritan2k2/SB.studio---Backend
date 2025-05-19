import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'gallery', // tên folder trong Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [
      { width: 1020, height: 1020, crop: 'fill', gravity: 'center' }
    ]
  },
});

const uploadGallery = multer({ storage });

export default uploadGallery;
