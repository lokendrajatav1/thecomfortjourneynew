// import express from "express";
// import multer from "multer";
// import Car from "../../models/admin/editcarModel.js";
// import path from "path";

// const router = express.Router();

// // Multer Storage Setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });

// const upload = multer({ storage });

// // Fetch all cars
// router.get("/", async (req, res) => {
//   const cars = await Car.find();
//   res.json(cars);
// });

// // Add new car
// router.post("/", upload.single("image"), async (req, res) => {
//   const { name, price } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : "";
//   const newCar = new Car({ name, price, image });
//   await newCar.save();
//   res.json(newCar);
// });

// // Update car details
// router.put("/:id", upload.single("image"), async (req, res) => {
//   const { name, price } = req.body;
//   const updateData = { name, price };
//   if (req.file) updateData.image = `/uploads/${req.file.filename}`;
//   const updatedCar = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });
//   res.json(updatedCar);
// });

// // Delete car
// router.delete("/:id", async (req, res) => {
//   await Car.findByIdAndDelete(req.params.id);
//   res.json({ message: "Car deleted successfully" });
// });

// export default router;
