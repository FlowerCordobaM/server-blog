const { handleHttpError } = require("../../../shared/helpers/handleError");
const {CategoryModel  } = require("../models");

const createCategorie = async (req, res = response) => {
  try {
      // Verificar si ya existe un categorie con el mismo nombre
      const existingCategorie = await CategoryModel.findOne({ name: req.body.name });
      if (existingCategorie) {
          return res.status(400).json({
              ok: false,
              msg: 'Una categorie con este nombre ya existe'
          });
      }

      // Crear un nuevo categorie si no existe uno con el mismo nombre
      const categorie = new CategoryModel({
          user: req.uid,
          ...req.body
      });

      const categorieDb = await categorie.save();
      res.json({
          ok: true,
          msg: 'categorie creado exitosamente',
          categorieDb
      });
  } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_CREATE_categorieS");
  }
};

const updatecategorie = async (req, res) => {
  try {
    const updatedcategorie = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedcategorie) {
        return res.status(404).json({
            ok: false,
            msg: 'categorie no encontrado'
        });
    }
    res.json({
        ok: true,
        msg: 'categorie actualizado',
        updatedcategorie
    });
} catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_categorie");
}
}
// const blogs = await blogModel.find().populate('user','name profesion img').populate('categorie').populate('tag');

const getItcategories = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;
  try {
    const categories = await CategoryModel.find().populate('user','name profesion img').limit(limit)
    .skip(skipIndex);

    const total = await CategoryModel.countDocuments();

    res.json({
        page,
        limit,
        total,
        categories,
        ok: true,
        msg: 'Lista de categories',
        categories,
    });
} catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_ALL_categorieS");
}
};
const getIcategoriesById = async (req, res) => {
  try {
    const categorie = await CategoryModel.findById(req.params.id);
    if (!categorie) {
        return res.status(404).json({
            ok: false,
            msg: 'categorie no encontrado'
        });
    }
    res.json({
        ok: true,
        msg: 'Detalles del categorie',
        categorie
    });
} catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_categorie_BY_ID");
}
};

const deletecategorie = async (req, res) => {
  try {
    const deletedcategorie = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!deletedcategorie) {
        return res.status(404).json({
            ok: false,
            msg: 'categorie no encontrado'
        });
    }
    res.json({
        ok: true,
        msg: 'categorie eliminado',
        deletedcategorie
    });
} catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_DELETE_categorie");
}
};

module.exports = {
  createCategorie,
  getItcategories,
  getIcategoriesById,
  updatecategorie,
  deletecategorie
 

};
