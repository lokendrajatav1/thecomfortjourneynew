import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import {
  addOffer,
  getOffers,
  updateOffer,
  deleteOffer,
} from '../controllers/offerController.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const filename = Date.now() + fileExt;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), addOffer);
router.get('/', getOffers);
router.put('/:id', updateOffer);
router.delete('/:id', deleteOffer);

export default router;
