import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Offer from '../models/offerModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add a new offer
const addOffer = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    const newOffer = new Offer({ imageUrl });
    await newOffer.save();

    res.status(201).json(newOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding offer' });
  }
};

// Get all offers
const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching offers' });
  }
};

// Update an offer
const updateOffer = async (req, res) => {
  const { id } = req.params;
  const newImageUrl = req.body.imageUrl;

  try {
    const offer = await Offer.findByIdAndUpdate(
      id,
      { imageUrl: newImageUrl },
      { new: true }
    );

    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.status(200).json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating offer' });
  }
};

// Delete an offer
const deleteOffer = async (req, res) => {
  const { id } = req.params;

  try {
    const offer = await Offer.findByIdAndDelete(id);
    
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    const imagePath = path.join(__dirname, '..', 'uploads', path.basename(offer.imageUrl));
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting offer' });
  }
};

export { addOffer, getOffers, updateOffer, deleteOffer };
