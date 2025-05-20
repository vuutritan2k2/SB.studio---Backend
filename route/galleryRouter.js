import { Router } from "express";
import uploadGallery from '../config/uploadGallery.js'
import { createGallery, getGallerry, getGallerryById } from '../controllers/galleryController.js'
import authJWT from "../middleware/authJWT.js";
import { v2 as cloudinary } from 'cloudinary';


const galleryRouter = Router()

galleryRouter.post('/createImage', authJWT, uploadGallery('gallery').single('image'), createGallery)
galleryRouter.get('/all', getGallerry)
galleryRouter.get('/:userId', authJWT, getGallerryById)
galleryRouter.delete('/delete', async (req, res) => {
  try {
    // Bước 1: Lấy danh sách ảnh trong folder gallery
    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'gallery/',
      max_results: 500,
    });

    if (!resources.length) {
      console.log('Không có ảnh nào trong folder gallery.');
      return res.status(200).json({ message: 'Không có ảnh nào trong folder gallery.' });
    }

    // Bước 2: Lấy danh sách public_id
    const publicIds = resources.map((img) => img.public_id);

    // Bước 3: Xoá từng ảnh
    const deletePromises = publicIds.map((id) =>
      cloudinary.uploader.destroy(id, {
        invalidate: true,
        resource_type: 'image',
      })
    );

    const deleteResults = await Promise.all(deletePromises);
    console.log('✅ Đã xoá toàn bộ ảnh (và yêu cầu xoá cache):', deleteResults);

    return res.status(200).json({
      message: `Đã xoá ${deleteResults.length} ảnh trong gallery.`,
      results: deleteResults,
    });

  } catch (error) {
    console.error('❌ Lỗi xoá ảnh:', error.message || error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi xoá ảnh.', detail: error.message || error });
  }
});


export default galleryRouter