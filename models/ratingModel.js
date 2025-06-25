import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  phone: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Rating", ratingSchema);
