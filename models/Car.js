import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    name: String,
    price: String,
    fuel: String,
    extrafare:String,
    seat: String,
    cartype: String,
    clock: String,
    cooling: String,
    selfdrive: String,
    location:String,
    image: String,
    isBooked: { type: Boolean, default: false },
});

export default mongoose.model("Car", carSchema);
