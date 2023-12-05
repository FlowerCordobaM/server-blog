const { blogModel } = require("../models");
const { handleHttpError } = require("../../../shared/helpers/handleError");

const createBlog = async (req, res) => {
  try {
    // Verificar si ya existe un categorie con el mismo nombre
    const existingBlog = await blogModel.findOne({ title: req.body.title });
    if (existingBlog) {
      return res.status(400).json({
        ok: false,
        msg: "Una Blog con este titulo ya existe",
      });
    }

    // Crear un nuevo categorie si no existe uno con el mismo nombre
    const blog = new blogModel({
      user: req.uid,
      ...req.body,
    });

    const blogDb = await blog.save();
    res.json({
      ok: true,
      msg: "blog creado exitosamente",
      blogDb,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_CATEGORIE");
  }
};
const updateBlog = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_CATEGORIE");
  }
};
const getAllBlog = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skipIndex = (page - 1) * limit;
  try {
    const blogs = await blogModel.find().populate('user','name profesion img').populate('categorie').populate('tag')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skipIndex);
    const total = await blogModel.countDocuments();
    res.json({
      ok:true,
      msg:'todos los blos',
      page,
      limit,
      total,
      blogs,
  });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_getItCategory");
  }
};

const getIBlogById = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id).populate('user').populate('categorie').populate('tag');
    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_ID_blogById");
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_DELETE_blog");
  }
};

module.exports = {
  deleteBlog,
  getIBlogById,
  updateBlog,
  createBlog,
  getAllBlog,
};

