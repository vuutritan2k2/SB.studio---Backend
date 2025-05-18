import UserModel from "../models/userModel.js";
import bcryptjs from "bcryptjs"
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";

// Đăng ký tài khoản
export async function registerUserController(request, response) {
    try {
        const { phone, password, name, } = request.body

        if (!name, !phone, !password) {
            return response.status(500).json({
                message: "Provide phone, name or password",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ phone })

        if (user) {
            return response.json({
                message: "Already register phone",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            phone,
            name,
            password: hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        return response.status(200).json({
            message: "User register successfully",
            success: true,
            data: save
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Đăng nhập tài khoản
export async function loginUserController(request, response) {
    try {
        const { phone, password } = request.body

        if (!phone || !password) {
            return response.status(400).json({
                message: 'Vui lòng nhập đủ thông tin',
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ phone })

        if (!user) {
            return response.json({
                message: 'Tài khoản không tồn tại',
                error: true,
                success: false
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password)

        if (!checkPassword) {
            return response.status(400).json({
                message: 'Kiểm tra lại mật khẩu',
                error: true,
                success: false
            })
        }

        const accesstoken = await generatedAccessToken(user._id, user.role)
        const refreshtoken = await generatedRefreshToken(user._id, user.role)

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        response.cookie('accesstoken', accesstoken, cookiesOption)

        return response.status(200).json({
            message: 'Đăng nhập thành công',
            user,
            accesstoken
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Đăng xuất tài khoản
export async function logoutUserController(request, response) {
    try {
        const cookiesOptions = {
            httpOnly : true,
            secure : true,
            sameSite : 'None'
        }

        response.clearCookie('accesstoken', cookiesOptions)

        return response.json({
            message : "Đăng xuất thành công"
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Lấy thông tin người dùng hiện tại
export const getUserInfo = async (request, response) => {
  const user = await UserModel.findById(request.userId).select('-password'); // Lấy thông tin người dùng hiện tại, không lấy password
  response.json({
    statusCode: 200,
    data: user,
  });
};
