import jwt from "jsonwebtoken"

export default {
    generateToken: (user: any) => {
        const options = {
            expiresIn: process.env.JWT_EXPIRY as string,
            issuer: ""
        };
        const secret = process.env.JWT_SECRET as string;
        const token = jwt.sign(user, secret, options)
        const now = new Date();
        return {
            token,
            expires_in: now.setMonth(now.getMonth() + 3)
        }
    }
}