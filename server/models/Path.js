import mongoose from "mongoose";
// import User from "./User";

const pathSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
        },
        description:{
            type: String,
            default: ""
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,   //it tells Mongoose to store a 12-byte binary identifier instead of an entire embedded document string.
            ref: "User",
            required: true
        },
        isPublic: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

const Path = mongoose.model("Path", pathSchema);
export default Path;