import express from "express";
import  { createContact, getAllContacts } from "../controllers/contactController.js";

import adminauthMiddleware from "../middleware/adminauthMiddleware.js";


const router = express.Router();

router.post("/add", createContact);
router.get("/all" , adminauthMiddleware, getAllContacts);

export default router;
