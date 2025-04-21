import express from "express";
import  { createContact, getAllContacts } from "../controllers/contactController.js";

import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/add", createContact);
router.get("/all" , getAllContacts);

export default router;
