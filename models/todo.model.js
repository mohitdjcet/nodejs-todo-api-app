import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            default : ""
        },
        isCompleted: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);