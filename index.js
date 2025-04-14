import express from 'express';

import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import carRoutes from './routes/carRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';



// const carRoutes =require("./routes/carRoutes.js");

import authMiddleware from "./middleware/authMiddleware.js";

import booking from "./routes/bookingRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import contactRoutes from "./routes/contactRoutes.js";

// import carRoutes from "./routes/car.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

import  blogRoutes from "./routes/blogRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
dotenv.config();
connectDB();



// Middleware
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Middleware for serving static files from the "public/dist" directory
// This is important for serving the frontend build files
// ⬇️ ADD THIS before app.listen()
// app.use(express.static(path.join(__dirname, 'public/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/dist/index.html'));
// });



// ✅ Proper CORS middleware setup
app.use(cors({
  origin: 'http://localhost:5173', // Adjust for your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));


//middleware for admin routes
app.use("/api/v1/admin", adminRoutes);



app.use("/api/v1/blogs",blogRoutes);


app.use('/api/v1/cars', carRoutes);

app.use("/api/v1/carsnew",carRoutes);
app.use("/api/v1/bookingsnew",bookingRoutes); 


app.use("/api/v1/contact", contactRoutes);





app.use("/api/v1/bookings", booking);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});












