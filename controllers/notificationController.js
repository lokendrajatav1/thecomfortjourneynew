import Notification from "../models/notificationModel.js";

// Get all notifications for logged-in user
export const getUserNotifications = async (req, res) => {
  try {
    const notes = await Notification.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch notifications",
      success: false,
      error: err.message,
    });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.userId, read: false },
      { $set: { read: true } }
    );
    res.json({ message: "All notifications marked as read", success: true });
  } catch (err) {
    res.status(500).json({
      message: "Failed to mark notifications as read",
      success: false,
      error: err.message,
    });
  }
};

// Clear all notifications for user
export const clearAllNotifications = async (req, res) => {
  try {
    const result = await Notification.deleteMany({ userId: req.userId });
    res.json({
      message: "All notifications cleared",
      deletedCount: result.deletedCount,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: err.message,
    });
  }
};

// Delete single notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found", success: false });
    }

    res.json({ message: "Notification deleted", success: true });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: "Failed to delete notification",
      success: false,
      error: err.message,
    });
  }
};
