// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from './cloudinary.js';

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'gallery', // tên folder trong Cloudinary
//     allowed_formats: ['jpg', 'jpeg', 'png'],
//     transformation: [
//       { width: 1020, height: 1020, crop: 'fill', gravity: 'center' }
//     ]
//   },
// });

// const uploadGallery = multer({ storage });

// export default uploadGallery;

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

// Hàm tạo storage nhận folder name
const createStorage = (folderName) => new CloudinaryStorage({
  cloudinary,
  params: {
    folder: folderName,
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [
      { width: 1020, height: 1020, crop: 'fill', gravity: 'center' }
    ]
  },
});

// Hàm tạo middleware upload multer cho folder bất kỳ
const uploadGallery = (folderName = 'gallery') => multer({ storage: createStorage(folderName) });

export default uploadGallery;
