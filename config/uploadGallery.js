import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'gallery', // tên folder trong Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const uploadGallery = multer({ storage });

export default uploadGallery;
