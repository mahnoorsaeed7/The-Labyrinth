import dns from "node:dns";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import bcrypt from "bcryptjs";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

import User from "../models/User.js";
import Path from "../models/Path.js";
import Node from "../models/Node.js";

dotenv.config();

const DEMO_EMAIL = "demo@labyrinth.local";
const DEMO_PASSWORD = "DemoPassword123!";

async function seed() {
  // TODO 1:
  // Connect to MongoDB.
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("MongoDB connected.");

  // TODO 2:
  // Find the demo user.
  let demoUser = await User.findOne({
    email: DEMO_EMAIL,
  });

  // TODO 3:
  // Create the demo user if it does not exist.
  if (!demoUser) {
  demoUser = await User.create({
    username: "demo",
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
  });

  console.log("Demo user created.");
} else {
  const passwordIsValid = await demoUser.comparePassword(
    DEMO_PASSWORD
  );

  if (!passwordIsValid) {
    demoUser.password = DEMO_PASSWORD;
    await demoUser.save();

    console.log("Demo user password repaired.");
  } else {
    console.log("Demo user already exists.");
  }
}

  // TODO 4:
  // Define demo Path data.
  //
  // These are only definitions.
  // Nothing is inserted yet.
  const demoPaths = [
    {
      title: "Learn MERN",
      description:
        "A practical roadmap for learning MongoDB, Express, React, and Node.js.",
      visibility: "public",

      nodes: [
        {
          key: "javascript",
          title: "Learn JavaScript",
          description:
            "Build a strong foundation in modern JavaScript.",
          type: "decision",
          position: { x: 0, y: 0 },
          resources: [
            "JavaScript fundamentals",
            "ES6+ syntax",
          ],
        },
        {
          key: "react",
          title: "Learn React",
          description:
            "Learn components, state, props, hooks, and React Flow.",
          type: "decision",
          position: { x: 300, y: 0 },
          resources: [
            "Components",
            "Hooks",
            "React Flow",
          ],
        },
        {
          key: "node",
          title: "Learn Node.js",
          description:
            "Build backend applications with Node.js and Express.",
          type: "decision",
          position: { x: 600, y: 0 },
          resources: [
            "Node.js",
            "Express",
            "REST APIs",
          ],
        },
        {
          key: "mongodb",
          title: "Learn MongoDB",
          description:
            "Store and retrieve application data using MongoDB and Mongoose.",
          type: "decision",
          position: { x: 900, y: 0 },
          resources: [
            "MongoDB",
            "Mongoose",
            "MongoDB Atlas",
          ],
        },
        {
          key: "project",
          title: "Build a MERN Project",
          description:
            "Combine the frontend and backend into a complete application.",
          type: "decision",
          position: { x: 1200, y: 0 },
          resources: [
            "Authentication",
            "CRUD",
            "Deployment",
          ],
        },
      ],

      edges: [
        ["javascript", "react"],
        ["react", "node"],
        ["node", "mongodb"],
        ["mongodb", "project"],
      ],
    },

    {
      title: "Study Abroad",
      description:
        "A step-by-step roadmap for preparing a study abroad application.",
      visibility: "public",

      nodes: [
        {
          key: "research",
          title: "Research Universities",
          description:
            "Find universities and programs that match your goals.",
          type: "decision",
          position: { x: 0, y: 0 },
          resources: [
            "University websites",
            "Program requirements",
          ],
        },
        {
          key: "requirements",
          title: "Check Requirements",
          description:
            "Review academic, language, financial, and application requirements.",
          type: "decision",
          position: { x: 300, y: 0 },
          resources: [
            "Admission requirements",
            "Language requirements",
          ],
        },
        {
          key: "documents",
          title: "Prepare Documents",
          description:
            "Prepare transcripts, CV, statement of purpose, and recommendation letters.",
          type: "decision",
          position: { x: 600, y: 0 },
          resources: [
            "Transcript",
            "CV",
            "Statement of Purpose",
            "Recommendation Letters",
          ],
        },
        {
          key: "apply",
          title: "Submit Applications",
          description:
            "Complete and submit applications before their deadlines.",
          type: "decision",
          position: { x: 900, y: 0 },
          resources: [
            "Application portals",
            "Deadlines",
          ],
        },
        {
          key: "visa",
          title: "Prepare for Visa",
          description:
            "Prepare the required documents and complete the visa process.",
          type: "decision",
          position: { x: 1200, y: 0 },
          resources: [
            "Visa documents",
            "Financial documents",
            "Interview preparation",
          ],
        },
      ],

      edges: [
        ["research", "requirements"],
        ["requirements", "documents"],
        ["documents", "apply"],
        ["apply", "visa"],
      ],
    },
    {
  title: "Build a Startup",
  description:
    "A practical roadmap for turning an idea into a working startup.",
  visibility: "public",

  nodes: [
    {
      key: "idea",
      title: "Define the Idea",
      description:
        "Identify the problem, target users, and value proposition.",
      type: "decision",
      position: { x: 0, y: 0 },
      resources: [
        "Problem definition",
        "Target audience",
        "Value proposition",
      ],
    },
    {
      key: "validate",
      title: "Validate the Idea",
      description:
        "Test whether real users actually need the proposed solution.",
      type: "decision",
      position: { x: 300, y: 0 },
      resources: [
        "User interviews",
        "Market research",
        "Competitor analysis",
      ],
    },
    {
      key: "prototype",
      title: "Build a Prototype",
      description:
        "Create a small working version of the product.",
      type: "decision",
      position: { x: 600, y: 0 },
      resources: [
        "Wireframes",
        "Prototype",
        "MVP",
      ],
    },
    {
      key: "launch",
      title: "Launch MVP",
      description:
        "Release the minimum viable product and collect real feedback.",
      type: "decision",
      position: { x: 900, y: 0 },
      resources: [
        "Deployment",
        "Analytics",
        "User feedback",
      ],
    },
    {
      key: "iterate",
      title: "Improve and Scale",
      description:
        "Use feedback and data to improve the product and grow it.",
      type: "decision",
      position: { x: 1200, y: 0 },
      resources: [
        "Product iteration",
        "Growth",
        "Metrics",
      ],
    },
  ],

  edges: [
    ["idea", "validate"],
    ["validate", "prototype"],
    ["prototype", "launch"],
    ["launch", "iterate"],
  ],
},

{
  title: "Switch Careers",
  description:
    "A roadmap for planning and executing a transition into a new career.",
  visibility: "public",

  nodes: [
    {
      key: "skills",
      title: "Assess Your Skills",
      description:
        "Identify your existing skills, experience, and transferable strengths.",
      type: "decision",
      position: { x: 0, y: 0 },
      resources: [
        "Skills inventory",
        "Transferable skills",
      ],
    },
    {
      key: "target",
      title: "Choose a Target Career",
      description:
        "Research careers that match your interests, strengths, and goals.",
      type: "decision",
      position: { x: 300, y: 0 },
      resources: [
        "Career research",
        "Job descriptions",
        "Industry research",
      ],
    },
    {
      key: "learn",
      title: "Build Missing Skills",
      description:
        "Learn the technical and professional skills required for the new career.",
      type: "decision",
      position: { x: 600, y: 0 },
      resources: [
        "Courses",
        "Projects",
        "Practice",
      ],
    },
    {
      key: "portfolio",
      title: "Build Your Portfolio",
      description:
        "Create projects that demonstrate your ability to work in the new field.",
      type: "decision",
      position: { x: 900, y: 0 },
      resources: [
        "Portfolio projects",
        "GitHub",
        "Case studies",
      ],
    },
    {
      key: "job",
      title: "Apply for Opportunities",
      description:
        "Apply for internships, freelance work, and full-time opportunities.",
      type: "decision",
      position: { x: 1200, y: 0 },
      resources: [
        "Resume",
        "Networking",
        "Job applications",
      ],
    },
  ],

  edges: [
    ["skills", "target"],
    ["target", "learn"],
    ["learn", "portfolio"],
    ["portfolio", "job"],
  ],
},
  ];

  let createdPaths = 0;
  let skippedPaths = 0;
  let createdNodes = 0;

  // TODO 5:
  // Process every demo Path.
  for (const demoPath of demoPaths) {
    const existingPath = await Path.findOne({
      owner: demoUser._id,
      title: demoPath.title,
    });

    if (existingPath) {
      console.log(
        `Skipping existing demo Path: ${demoPath.title}`
      );

      skippedPaths++;
      continue;
    }

    // Create the Path first.
    const path = await Path.create({
      title: demoPath.title,
      description: demoPath.description,
      owner: demoUser._id,
      visibility: demoPath.visibility,
    });

    createdPaths++;

    // TODO 6:
    // Create Node documents for this Path.
    //
    // We keep a temporary key -> MongoDB _id map.
    // The key is only used by the seed script.
    const nodeIdMap = new Map();

    for (const demoNode of demoPath.nodes) {
      const node = await Node.create({
        title: demoNode.title,
        description: demoNode.description,
        path: path._id,
        parentNode: null,
        type: demoNode.type,
        position: demoNode.position,
        resources: demoNode.resources,
      });

      nodeIdMap.set(
        demoNode.key,
        node._id.toString()
      );

      createdNodes++;
    }

    // TODO 7:
    // Build edges using the actual MongoDB Node IDs.
    const edges = demoPath.edges.map(
      ([sourceKey, targetKey], index) => {
        const source = nodeIdMap.get(sourceKey);
        const target = nodeIdMap.get(targetKey);

        if (!source || !target) {
          throw new Error(
            `Could not build edge ${index + 1} for "${demoPath.title}"`
          );
        }

        return {
          id: `edge-${source}-${target}`,
          source,
          target,
        };
      }
    );

    // TODO 8:
    // Save the edges inside the Path document.
    path.edges = edges;

    await path.save();

    console.log(
      `Created Path: ${demoPath.title}`
    );

    console.log(
      `  Nodes: ${demoPath.nodes.length}`
    );

    console.log(
      `  Edges: ${edges.length}`
    );
  }

  // TODO 9:
  // Print useful summary.
  console.log("\n========== DEMO SEED SUMMARY ==========");
  console.log(`Demo email: ${DEMO_EMAIL}`);
  console.log(`Demo password: ${DEMO_PASSWORD}`);
  console.log(`Paths created: ${createdPaths}`);
  console.log(`Paths skipped: ${skippedPaths}`);
  console.log(`Nodes created: ${createdNodes}`);
  console.log("========================================");

  // TODO 10:
  // Disconnect MongoDB.
  await mongoose.disconnect();

  console.log("MongoDB disconnected.");
}

seed().catch(async (error) => {
  console.error("Seed failed:", error);

  try {
    await mongoose.disconnect();
  } catch {
    // Ignore disconnect errors.
  }

  process.exit(1);
});

