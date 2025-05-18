import { Router } from "express";
import { getUserInfo, loginUserController, logoutUserController, registerUserController } from "../controllers/userController.js";
import authJWT from "../middleware/authJWT.js";


const userRouter = Router()

userRouter.post('/register', registerUserController)
userRouter.post('/login', loginUserController)
userRouter.get('/logout', authJWT, logoutUserController)
userRouter.get('/userInfo', authJWT, getUserInfo)


export default userRouter