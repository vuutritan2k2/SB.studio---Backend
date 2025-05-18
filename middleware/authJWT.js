import jwt from "jsonwebtoken";

const authJWT = async (request, response, next) => {
    try {
        let token = null;

        if (request.cookies?.accesstoken) {
            token = request.cookies.accesstoken;
        } else if (request.headers.authorization?.startsWith('Bearer ')) {
            token = request.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return response.status(401).json({
                message : "Provide token"
            })
        }

        const decode = await jwt.verify(token, process.env.SERCET_KEY_ACCESS_TOKEN)

        if (!decode) {
            return response.status(401).json({
                message : "Unauthorized Access"
            })
        }

        request.userId = decode.id

        next()

    } catch (error) {
        return response.json({
            message: error || error.message,
            error: true,
            success: false
        })
    }
}

export default authJWT