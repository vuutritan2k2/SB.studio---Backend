import jwt from 'jsonwebtoken'

const generatedAccessToken = async (userId, role) => {
    const token = await jwt.sign({
        id: userId,
        role : role
    }, process.env.SERCET_KEY_ACCESS_TOKEN,
        {
            expiresIn: '5h'
        }
    )

    return token
}

export default generatedAccessToken