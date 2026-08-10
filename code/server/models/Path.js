import mongoose from "mongoose";

const edgeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      required: true,
    },

    target: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);



const pathSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [100, "Title must be less than 100 characters"],
      trim: true,
    },

    description: {
      type: String,
      maxlength: [500, "Description must be less than 500 characters"],
      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    edges: {
      type: [edgeSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Path = mongoose.model("Path", pathSchema);

export default Path;