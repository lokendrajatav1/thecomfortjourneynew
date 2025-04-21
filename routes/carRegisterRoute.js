import express from 'express';
import multer from 'multer';
import path from 'path';
import { registerCar, getAllCars, deleteCar } from '../controllers/carRegisterController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

router.post('/register', upload.single('image'), registerCar);
router.get('/cars', getAllCars);
router.delete('/delete/:id', deleteCar);

export default router;
