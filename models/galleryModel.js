import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
}, {
    timestamps: true
});

const GalleryModel = mongoose.model('Gallery', gallerySchema);

export default GalleryModel;
