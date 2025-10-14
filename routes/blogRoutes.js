import express from "express";
import multer from "multer";
import {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
} from "../controllers/blogController.js";
import authMiddleware from "../middleware/adminauthMiddleware.js";


const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

// Routes
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", authMiddleware, upload.single("image"), createBlog);
router.put("/:id", authMiddleware, upload.single("image"), updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
