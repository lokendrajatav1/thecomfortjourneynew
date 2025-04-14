import Blog from "../models/Blog.js";

// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs" });
    }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Add a new blog
export const createBlog = async (req, res) => {
    try {
        const { heading, content } = req.body;
        const image = req.file?.filename;

        const newBlog = new Blog({ heading, content, image });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: "Error creating blog" });
    }
};

// Update blog
export const updateBlog = async (req, res) => {
    try {
        const { heading, content } = req.body;
        const image = req.file?.filename;

        const updatedData = { heading, content };
        if (image) updatedData.image = image;

        const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error updating blog" });
    }
};

// Delete blog
export const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog" });
    }
};
