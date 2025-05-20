import FoodModel from '../models/foodModel.js'

export async function addFood(request, response) {
    try {
        const { foodName, price, address, description } = request.body
        const imageUrl = request.file.path; // URL từ Cloudinary

        const newFood = new FoodModel({
            foodName,
            imgUrl: imageUrl,
            price,
            address,
            description,
        });

        await newFood.save();

        response.status(201).json(newFood);

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Xem tất cả ảnh 
export async function getAllFood(request, response) {
    try {
        const foods = await FoodModel.find()
            .sort({ createdAt: -1 }); // sắp xếp mới nhất lên đầu (tùy chọn)
        response.json({
            foods
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}