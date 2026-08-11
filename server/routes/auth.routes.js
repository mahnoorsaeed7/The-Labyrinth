import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuthorization } from "../middleware/auth.middleware.js";

const router = express.Router();

function sendTokenCookie(res, userId) {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1" || !!process.env.VERCEL_URL;

  res.cookie("token", token, {
    httpOnly: true,
    // production must use HTTPS-only cookies
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
  return token;
}
//   // TODO 2: Send the token inside a secured cookie
//   res.cookie("token", token, {
//     httpOnly: true,                         // Prevents XSS attacks (JS cannot read the cookie)
//     secure: process.env.NODE_ENV === "production", // Sends cookie over HTTPS only in production
//     sameSite: "lax",                        // Helps protect against CSRF attacks
//     maxAge: 7 * 24 * 60 * 60 * 1000         // Tells the browser to delete it after 7 days (in ms)
//   });

router.post("/register", async(req , res) => {
    try {
        const {username , email , password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({error: "All Fiels are Required."});
        }

        const existingUser = await User.findOne({
            $or: [
                {email},
                {username}
            ]
        });

        if(existingUser){
            return res.status(409).json({error: "User Already Exist."});
        }

        const newUser = await User.create({
            username,
            email,
            password
        });
        const token = sendTokenCookie(res , newUser._id);

        return res.status(201).json({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token
        });

    } catch (err) {
  console.error("===== REGISTRATION ERROR =====");
  console.error(err);
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);

  res.status(500).json({ error: "Something went wrong during registration." });
}
});

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const token = sendTokenCookie(res, user._id);

        return res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token
        });

    } catch (err) {

        res.status(500).json({
            error: "Something went wrong during login."
        });

    }
});

router.post("/logout", (req, res) => {
  const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1" || !!process.env.VERCEL_URL;
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/"  // cookie is accessible across your entire website
  });
  
  return res.status(200).json({ message: "Logged out successfully" });
});


router.get("/me", requireAuthorization, async (req , res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if( !user ){
            return res.status(404).json({error: "No User Found"})
        } 

        return res.json(user);
    } catch (error) {
         return res.status(500).json({ message: "Server error" });
    }
   
});


export default router;