import GalleryModel from '../models/galleryModel.js'

//Thêm ảnh
export async function createGallery(request, response) {
    try {
        const { title, userId } = request.body
        const imageUrl = request.file.path; // URL từ Cloudinary

        const newGallery = new GalleryModel({
            title,
            imgUrl: imageUrl,
            userId,
        });

        await newGallery.save();

        response.status(201).json(newGallery);
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Xem tất cả ảnh 
export async function getGallerry(request, response) {
    try {
        const galleries = await GalleryModel.find()
            .populate('userId', 'name avatar')
            .sort({ createdAt: -1 }); // sắp xếp mới nhất lên đầu (tùy chọn)
        response.json({
            galleries
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Xem tất cả ảnh bằng ID
export async function getGallerryById(request, response) {
    try {
        const userId = request.params.userId

        const galleries = await GalleryModel.find({ userId })
            .populate('userId', 'name avatar')
            .sort({ createdAt: -1 }); // sắp xếp mới nhất lên đầu (tùy chọn)
        response.json({
            galleries
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}