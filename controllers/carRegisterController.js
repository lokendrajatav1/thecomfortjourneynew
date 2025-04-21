import carRegister from '../models/carRegister.js';
import fs from 'fs';
import path from 'path';

export const registerCar = async (req, res) => {
  try {
    const { carName, model, numberPlate, fuelType, seats, clientName, phone, email } = req.body;
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
    res.status(201).json(car);
  } catch (error) {
    console.error('Car registration failed:', error);
    res.status(500).json({ error: 'Failed to register car' });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const cars = await carRegister.find().sort({ createdAt: -1 });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carRegister.findByIdAndDelete(id);

    if (!car) return res.status(404).json({ message: 'Car not found' });

    const imagePath = path.join('public', car.image);
    fs.unlink(imagePath, (err) => {
      if (err) console.log('Image deletion error:', err);
    });

    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete car' });
  }
};
