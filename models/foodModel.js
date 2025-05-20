import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
    },
    price: {
        type: String,
    },
    address: {
        type: String,
    },
    description: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
}, {
    timestamps: true
});

const FoodModel = mongoose.model('Food', foodSchema);

export default FoodModel;
