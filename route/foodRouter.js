import { Router } from "express";
import authJWT from "../middleware/authJWT.js";
import uploadGallery from '../config/uploadGallery.js'
import { addFood, getAllFood } from "../controllers/foodController.js";

const foodRouter = Router()

foodRouter.post('/create', authJWT, uploadGallery('food').single('image'), addFood)
foodRouter.get('/all', authJWT, getAllFood)

export default foodRouter