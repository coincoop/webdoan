import AdMenu from "../models/AdMenuModel.js";

export const getMenus = async (req, res) => {
  try {
    const response = await AdMenu.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMenuById = async (req, res) => {
  try {
    const response = await AdMenu.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createMenu = async (req, res) => {
  try {
    const { name, parent_id, url, img } = req.body;
    
    const response = await AdMenu.create({
      name,
      parent_id,
      img: img || "", // Set default value "" when img is not provided
      url,
    });

    res.status(201).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};



export const updateMenu = async (req, res) => {
  try {
    const { name, parent_id, url, img } = req.body;
    const menu = await AdMenu.findOne({ where: { id: req.params.id } });

    if (!menu) {
      return res.status(404).json({ msg: "menu not found" });
    }

    const updatedMenu = await menu.update({
      name: name || menu.name,
      parent_id: parent_id || menu.parent_id,
      img: img || menu.img,
      url: url || menu.url,
    });

    res.status(200).json(updatedMenu);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    await AdMenu.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Menu Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
