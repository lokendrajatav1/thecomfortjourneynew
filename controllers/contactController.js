import Contact  from "../models/contact.js";

// Create a new contact
export const createContact = async (req, res) => {
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
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch contacts", error });
    }
};


