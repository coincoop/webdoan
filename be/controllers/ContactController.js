import express from 'express';
import Contact from '../models/ContactModel.js';

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ where: { status: 1 } });
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

