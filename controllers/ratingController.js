import Rating from "../models/ratingModel.js";

export const submitRating = async (req, res) => {
  const { phone, rating, comment } = req.body;
  if (!rating || !phone) return res.status(400).json({ message: "Rating and phone are required" });

  await Rating.create({ phone, rating, comment });
  res.json({ message: "Thank you for your rating!" });
};

