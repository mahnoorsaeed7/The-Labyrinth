import express from "express";
import Path from "../models/Path.js";
import { requireAuthorization } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", requireAuthorization, async (req, res) => {
    try {
        const paths = await Path.find({
            owner: req.user.id
        });

        return res.json(paths);

    } catch (error) {
        console.error("GET /api/paths error:", error);

        return res.status(500).json({
            message: "Failed to fetch paths"
        });
    }
});


router.post("/", requireAuthorization, async (req, res) => {
  try {
    const { title, description, visibility } = req.body;

    const path = new Path({
      title,
      description,
      visibility,
      owner: req.user.id,
    });

    await path.save();

    return res.status(201).json(path);
  } catch (error) {
    console.error("POST /api/paths error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to create path",
    });
  }
});


export default router;