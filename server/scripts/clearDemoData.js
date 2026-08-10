import dns from "node:dns";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Path from "../models/Path.js";
import Node from "../models/Node.js";
import User from "../models/User.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const DEMO_EMAIL = "demo@labyrinth.local";

async function clearDemoData() {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("MongoDB connected.");

  const demoUser = await User.findOne({
    email: DEMO_EMAIL,
  });

  if (!demoUser) {
    console.log("Demo user not found.");
    await mongoose.disconnect();
    return;
  }

  const paths = await Path.find({
    owner: demoUser._id,
  });

  const pathIds = paths.map((path) => path._id);

  if (pathIds.length > 0) {
    const nodeResult = await Node.deleteMany({
      path: { $in: pathIds },
    });

    const pathResult = await Path.deleteMany({
      owner: demoUser._id,
    });

    console.log(`Deleted ${pathResult.deletedCount} demo paths.`);
    console.log(`Deleted ${nodeResult.deletedCount} demo nodes.`);
  } else {
    console.log("No demo paths found.");
  }

  await mongoose.disconnect();

  console.log("MongoDB disconnected.");
}

clearDemoData().catch(async (error) => {
  console.error("Cleanup failed:", error);

  try {
    await mongoose.disconnect();
  } catch {}

  process.exit(1);
});