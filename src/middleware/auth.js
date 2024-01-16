import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

    if (!token) {
        return res.status(401).json({ message: "please make sure you have a token, dude..." })
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token provided" })
        }

        req.user = decoded;
        next();
    })
}

export default authMiddleware;