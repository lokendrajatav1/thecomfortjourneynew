import express from "express";
import multer from "multer";
import path from "path";
import Car from "../models/Car.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Get all cars
router.get("/", async (req, res) => {
    const cars = await Car.find();
    res.json(cars);
});

// Add new car
router.post("/", upload.single("image"), async (req, res) => {
    const {
        name,
        price,
        fuel,
        extrafare,
        seat,
        cartype,
        cooling,
        selfdrive,
        clock,
        location,
    } = req.body;
    const car = new Car({
        name,
        price,
        fuel,
        extrafare,
        seat,
        cartype,
        cooling,
        selfdrive,
        clock,
        location,
        image: req.file.filename,
    });
    await car.save();
    res.json(car);
});

// Delete car
router.delete("/:id", async (req, res) => {
    await Car.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
});

// Update car
router.put("/:id", upload.single("image"), async (req, res) => {
    const update = {
        name: req.body.name,
        price: req.body.price,
        extrafare:req.body.extrafare,
        fuel: req.body.fuel,
        seat: req.body.seat,
        cartype: req.body.cartype,
        cooling: req.body.cooling,
        selfdrive: req.body.selfdrive,
        clock: req.body.clock,
        location:req.body.location,
    };
    if (req.file) {
        update.image = req.file.filename;
    }
    await Car.findByIdAndUpdate(req.params.id, update);
    res.sendStatus(200);
});

// Book a car
router.put("/book/:id", async (req, res) => {
    await Car.findByIdAndUpdate(req.params.id, { isBooked: true });
    res.sendStatus(200);
});

export default router;
