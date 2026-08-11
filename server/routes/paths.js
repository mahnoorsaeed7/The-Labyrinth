import express from "express";
import Path from "../models/Path.js";
import { requireAuthorization } from "../middleware/auth.middleware.js";
import Node from "../models/Node.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", requireAuthorization, async (req, res) => {
  try {
    const paths = await Path.find({
      $or: [
        { owner: req.user.id },
        { visibility: "public" }
      ]
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

router.get("/:id", requireAuthorization, async (req, res) => {
  try {
    const { id } = req.params;
    // you are grabbing that exact ID out of the URL bar so your database knows which specific graph path the user is trying to update.

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Path ID format" });
    }

    const path = await Path.findById(id);

    if (!path) {
      return res.status(404).json({
        message: "Failed to get the path"
      });
    }

    if (path.owner.toString() !== req.user.id && path.visibility !== "public") {
      return res.status(403).json({ message: "You do not own this path" });
    }

    const nodes = await Node.find({ path: path._id });

    return res.json({
      path,
      nodes,
      edges: path.edges || []
    });

  } catch (error) {
    console.error("GET /:id error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", requireAuthorization, async (req, res) => {
  try {
    const { nodes, edges } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Path ID format",
      });
    }

    const path = await Path.findById(id);

    if (!path) {
      return res.status(404).json({
        message: "Path not found",
      });
    }

    if (path.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You do not own this path",
      });
    }

    if (!Array.isArray(nodes) || !Array.isArray(edges)) {
      return res.status(400).json({
        message: "Validation failed: nodes and edges must be arrays",
      });
    }

    // Remove the old nodes for this path.
    await Node.deleteMany({ path: path._id });

    // Convert React Flow nodes into MongoDB Node documents.
    const formattedNodes = nodes.map((node) => ({
      title: node.data?.title || "Untitled Node",
      description: node.data?.description || "",
      path: path._id,
      parentNode: null,
      type: node.type || "step",
      position: {
        x: node.position?.x ?? 0,
        y: node.position?.y ?? 0,
      },
      resources: node.data?.resources || [],
    }));

    // Insert the nodes and receive their new MongoDB IDs.
    const insertedNodes = await Node.insertMany(formattedNodes);

    // Create a map:
    // React Flow node ID -> MongoDB node ID
    const nodeIdMap = new Map();

    nodes.forEach((node, index) => {
      nodeIdMap.set(
        node.id,
        insertedNodes[index]._id.toString()
      );
    });

    // Convert React Flow edges to MongoDB node IDs.

    const formattedEdges = edges.map((edge) => {
      const source = nodeIdMap.get(edge.source) || edge.source;
      const target = nodeIdMap.get(edge.target) || edge.target;

      return {
        id: edge.id || `edge-${source}-${target}`,
        source,
        target,
      };
    });



    // Save the converted edges inside the Path document.
    path.edges = formattedEdges;

    await path.save();

    const updatedNodes = await Node.find({
      path: path._id,
    });

    return res.json({
      path,
      nodes: updatedNodes,
      edges: path.edges,
    });
  } catch (error) {
    console.error("PUT /:id error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to update graph data",
    });
  }
});
export default router;

