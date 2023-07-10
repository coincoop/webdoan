import AdCateProd from "../models/AdCateProdModel.js";

export const getCateProd = async(req, res) => {
    try {
        const response = await AdCateProd.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getCateProdById = async(req, res) => {
    try {
        const response = await AdCateProd.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createCateProd = async(req, res) => {
    try {
        await AdCateProd.create(req.body)
        res.status(200).json({msg: "Created"});
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateCateProd = async(req, res) => {
    try {
        await AdCateProd.update(req.body, {
            where: {
                id: req.params.id 
            }
        });
        res.status(200).json({msg: "Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCateProdKeo = async(req, res) => {
    try {
        const { id } = req.params;
        const { stt } = req.body;
    
        const existingCateProd = await AdCateProd.findByPk(id);
        if (!existingCateProd) {
          return res.status(404).json({ error: "CateProd not found" });
        }

        await existingCateProd.update({ stt });
    
        res.status(200).json({ msg: "CateProd updated" });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Server error" });
      }
}

export const deleteCateProd = async(req, res) => {
    try {
        await AdCateProd.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}