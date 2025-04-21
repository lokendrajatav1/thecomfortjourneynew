import mongoose from 'mongoose';

const carRegisterSchema = new mongoose.Schema({
  carName: String,
  model: String,
  numberPlate: String,
  fuelType: String,
  seats: Number,
  clientName: String,
  phone: String,
  email: String,
  image: String,
});

export default mongoose.model('carRegister', carRegisterSchema);
