import Car from '../models/Car.js';

export const getCars = async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
};

export const addCar = async (req, res) => {
  const { name, price, fuel,seat, cartype, cooling, selfdrive,clock,location,offer} = req.body;
  const image = req.file.filename;
  const car = new Car({ name, price, fuel,seat, cartype, cooling, selfdrive,clock,location,offer, image });
  await car.save();
  res.json({ message: "Car added successfully" });
};

export const deleteCar = async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Car deleted" });
};

// Booking logic removed!
