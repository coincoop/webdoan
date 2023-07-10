import AdContact from "../models/AdContactModel.js";

import fs from "fs";
import path from "path";
export const getContact = async (req, res) => {
  try {
    const response = await AdContact.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getContactById = async (req, res) => {
  try {
    const response = await AdContact.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createContact = async (req, res) => {
  try {
    await AdContact.create(req.body)
    res.status(200).json({msg: "Created"});
} catch (error) {
    res.status(500).json(error);
}
};

export const updateContact = async (req, res) => {
  try {
    await AdContact.update(req.body, {
        where: {
            id: req.params.id 
        }
    });
    res.status(200).json({msg: "Updated"});
} catch (error) {
    console.log(error.message);
}
};

export const deleteContact = async (req, res) => {
  try {
    await AdContact.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Contact Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStatusContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await AdContact.update({ status }, { where: { id } });

    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
