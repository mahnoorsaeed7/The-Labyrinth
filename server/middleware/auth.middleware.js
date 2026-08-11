import jwt from 'jsonwebtoken';

export function requireAuthorization(req, res, next) {
    let token = req.cookies?.token;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ error: "Access denied. No Token Provided", message: "Access denied. No Token Provided" });
    }
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifyToken;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(401).json({ error: "Invalid or expired session", message: "Invalid or expired session" });
    }
}