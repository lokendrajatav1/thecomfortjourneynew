// models/offerModel.js

import mongoose from 'mongoose';

// Define the Offer schema
const offerSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String, // Store the URL of the uploaded image
      required: true, // Ensures the imageUrl is always provided when creating an offer
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields to each offer document
);

// Create a model based on the schema
const Offer = mongoose.model('Offer', offerSchema);

export default Offer; // Export using ES6 syntax
