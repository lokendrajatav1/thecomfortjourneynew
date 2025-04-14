const express = require("express");
const { createContact, getAllContacts } = require("../controllers/contactController");
const { default: authMiddleware } = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/add", createContact);
router.get("/all" , getAllContacts);

module.exports = router;
