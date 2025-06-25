import carRegister from '../models/carRegister.js';
import fs from 'fs';
import path from 'path';

export const registerCar = async (req, res) => {
  try {
    const {
      carName, model, numberPlate,
      fuelType, seats, clientName,
      phone, email
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const car = new carRegister({
      carName,
      model,
      numberPlate,
      fuelType,
      seats,
      clientName,
      phone,
      email,
      image,
    });

    await car.save();

    res.status(201).json({ message: "Car registration successful!" });
  } catch (error) {
    console.error('❌ Car registration failed:', error.message);
    res.status(500).json({ error: 'Failed to register car' });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const cars = await carRegister.find().sort({ createdAt: -1 });
    res.status(200).json(cars);
  } catch (error) {
    console.error('❌ Error fetching cars:', error.message);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carRegister.findByIdAndDelete(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.image) {
      const imagePath = path.resolve("public", car.image.replace(/^\/+/, ""));

      // ✅ Confirm file exists then delete
      fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(imagePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("❌ Failed to delete image:", unlinkErr.message);
            } else {
              console.log("🗑️ Image deleted:", imagePath);
            }
          });
        } else {
          console.warn("⚠️ Image not found, skipping delete:", imagePath);
        }
      });
    }

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("❌ Server error during car delete:", error.message);
    res.status(500).json({ error: "Failed to delete car" });
  }
};
