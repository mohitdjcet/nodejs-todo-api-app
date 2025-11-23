import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }catch (error) {
        console.log("Error in DB connection");
        console.error(error.message);
        process.exit(1);
    }
}