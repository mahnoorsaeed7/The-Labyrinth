import jwt from 'jsonwebtoken';

export function requireAuthorization(req, res, next) {
    const token = req.cookies.token;
    if(!token){

        return res.status(401).json({error: "Access denied. No Token Provided"}); // error or msg
    }
    try {

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verifyToken;
        next(); 

    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(401).json({ error: "Invalid or expired session" });
    }
}