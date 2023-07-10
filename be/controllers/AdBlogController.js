import AdBlog from "../models/AdBlogModel.js";

export const getBlog = async (req, res) => {
    try {
        const response = await AdBlog.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getBlogById = async (req, res) => {
    try {
        const response = await AdBlog.findOne({
            where: {
                idblog: req.params.idblog
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createBlog = async (req, res) => {
    try {
        const { tenblog, mota, url, img_blog } = req.body;

        const response = await AdBlog.create({
            tenblog,
            mota,
            img_blog, // Set default value "" when img is not provided
            url,
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { tenblog, mota, url, img_blog } = req.body;
        const menu = await AdBlog.findOne({ where: { idblog: req.params.idblog } });

        const updatedMenu = await menu.update({
            tenblog: tenblog || menu.tenblog,
            mota: mota || menu.mota,
            img_blog: img_blog || menu.img_blog,
            url: url || menu.url,
        });
        res.status(200).json(updatedMenu);
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteBlog = async (req, res) => {
    try {
        await AdBlog.destroy({
            where: {
                idblog: req.params.idblog
            }
        });
        res.status(200).json({ msg: "Blog Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}