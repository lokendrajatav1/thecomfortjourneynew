import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    heading: String,
    content: String,
    image: String
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
