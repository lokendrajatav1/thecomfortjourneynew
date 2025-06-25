// import mongoose from "mongoose";

// const carSchema = new mongoose.Schema({
//     name: String,
//     price: String,
//     fuel: String,
//     extrafare:String,
//     seat: String,
//     cartype: String,
//     clock: String,
//     cooling: String,
//     selfdrive: String,
//     location:String,
//     offer: String,
//     image: String,
//     isBooked: { type: Boolean, default: false },
// });

// export default mongoose.model("Car", carSchema);


import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: String,
  price: String,
  fuel: String,
  seat: String,
  extrafare: String,
  cartype: String,
  cooling: String,
  selfdrive: String,
  clock: String,
  offer: String,
  location: String,
  image: String,
  isBooked: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Car", carSchema);