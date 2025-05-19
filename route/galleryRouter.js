import { Router } from "express";
import uploadGallery from '../config/uploadGallery.js'
import { createGallery, getGallerry } from '../controllers/galleryController.js'
import authJWT from "../middleware/authJWT.js";


const galleryRouter = Router()

galleryRouter.post('/createImage', authJWT, uploadGallery.single('image'), createGallery)
galleryRouter.get('/all', getGallerry)

export default galleryRouter