const Contact = require("../models/Contact");

// Create a new contact
const createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();
        res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving message", error });
    }
};

// Fetch all contacts
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch contacts", error });
    }
};

module.exports = { createContact, getAllContacts };
