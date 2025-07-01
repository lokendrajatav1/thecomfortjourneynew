import Review from "../models/reviewModel.js";

// Add new review (user-facing)
export const addReview = async (req, res) => {
  try {
    const { name, rating, message } = req.body;
    const review = new Review({ name, rating, message }); // status will be "Pending" by default
    await review.save();
    res.status(201).json({ success: true, message: "Review submitted!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error submitting review" });
  }
};

// Get all reviews (optional: filter by status)
export const getReviews = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const reviews = await Review.find(query).sort({ date: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

// Admin: Approve or reject a review
export const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body; // Accept or Reject
    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};

// Admin: Edit review details
export const updateReview = async (req, res) => {
  try {
    const { name, rating, message } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { name, rating, message },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ message: "Error updating review" });
  }
};



export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review" });
  }
};
