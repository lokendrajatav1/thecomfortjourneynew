import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create upload directory if not exists
const uploadPath = 'uploads/profile/';
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/heif'];
  allowedTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error('Only JPG and PNG files are allowed'));
};

export const upload = multer({ storage, fileFilter });
