import User from '../models/User.js';


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-otp -otpExpiresAt -otpAttempts');
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-otp -otpExpiresAt -otpAttempts');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// export const updateProfileInfo = async (req, res) => {
//   const { name, email, address, dob, gender } = req.body;
//   const user = await User.findById(req.user.id);
//   if (!user) return res.status(404).json({ message: 'User not found' });

//   user.name = name || user.name;
//   user.email = email || user.email;
//   user.address = address || user.address;
//   user.dob = dob || user.dob;
//   user.gender = gender || user.gender;

//   await user.save();

//   res.json({
//     message: 'Profile updated successfully',
//     user: {
//       _id: user._id,
//       phone: user.phone,
//       name: user.name,
//       email: user.email,
//       address: user.address,
//       dob: user.dob,
//       gender: user.gender,
//       profilePic: user.profilePic,
//       isVerified: user.isVerified,
//     },
//   });
// };

// export const updateProfilePicture = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (req.file) {
//       user.profilePic = `/uploads/profile/${req.file.filename}`;
//       await user.save();
//       res.json({ message: "Profile picture updated", profilePic: user.profilePic });
//     } else {
//       res.status(400).json({ message: "No file uploaded" });
//     }
//   } catch (err) {
//     console.error("Upload image error:", err);
//     res.status(500).json({ message: "Upload failed" });
//   }
// };


export const bulkDeleteUsers = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "No user IDs provided." });
    }

    await User.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: "Users deleted successfully." });
  } catch (err) {
    console.error("Bulk delete error:", err);
    res.status(500).json({ error: "Failed to delete users." });
  }
};

// Delete single user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user." });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, address, dob, gender } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update profile fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.address;
    user.dob = dob || user.dob;
    user.gender = gender || user.gender;

    // If a profile picture is uploaded
    if (req.file) {
      user.profilePic = `/uploads/profile/${req.file.filename}`;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        address: user.address,
        dob: user.dob,
        gender: user.gender,
        profilePic: user.profilePic,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
