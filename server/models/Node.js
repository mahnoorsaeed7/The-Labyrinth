import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: { 
            type: String,
            default: "",
        },
        path: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Path",
            required: true,
        },
        parentNode: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Node",
            default: null,
        },
        type: {
            type: String,
            default: "step"
        },
        position: {
            x: {
                type: Number,
                default: 0 
            },
            y: {
                type: Number,
                default: 0 
            },
        },
        resources: {
            type: [String],
            default: []
        },
    },
    {
        timestamps: true
    }
);

const Node = mongoose.model("Node", nodeSchema);
export default Node;
