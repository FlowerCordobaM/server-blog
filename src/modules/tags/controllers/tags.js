const { handleHttpError } = require("../../../shared/helpers/handleError");
const {tagsModel  } = require("../models");

const createTags = async (req, res = response) => {
  try {
      // Verificar si ya existe un tag con el mismo nombre
      const existingTag = await tagsModel.findOne({ name: req.body.name });
      if (existingTag) {
          return res.status(400).json({
              ok: false,
              msg: 'Un tag con este nombre ya existe'
          });
      }

      // Crear un nuevo tag si no existe uno con el mismo nombre
      const tag = new tagsModel({
          user: req.uid,
          ...req.body
      });

      const tagDb = await tag.save();
      res.json({
          ok: true,
          msg: 'Tag creado exitosamente',
          tagDb
      });
  } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_CREATE_TAGS");
  }
};

const updateTag = async (req, res) => {
  try {
    const updatedTag = await tagsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTag) {
        return res.status(404).json({
            ok: false,
            msg: 'Tag no encontrado'
        });
    }
    res.json({
        ok: true,
        msg: 'Tag actualizado',
        updatedTag
    });
} catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATE_TAG");
}
}
const getItTags = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;
  try {
    const tags = await tagsModel.find().populate('user','name profesion img').limit(limit)
    .skip(skipIndex);

    const total = await tagsModel.countDocuments();
    res.json({
        ok: true,
        msg: 'Lista de tags',
        page,
        limit,
        total,
        tags,
    });
} catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_ALL_TAGS");
}
};
const getITagsById = async (req, res) => {
  try {
    const tag = await tagsModel.findById(req.params.id);
    if (!tag) {
        return res.status(404).json({
            ok: false,
            msg: 'Tag no encontrado'
        });
    }
    res.json({
        ok: true,
        msg: 'Detalles del tag',
        tag
    });
} catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_TAG_BY_ID");
}
};

const deleteTag = async (req, res) => {
  try {
    const deletedTag = await tagsModel.findByIdAndDelete(req.params.id);
    if (!deletedTag) {
        return res.status(404).json({
            ok: false,
            msg: 'Tag no encontrado'
        });
    }
    res.json({
        ok: true,
        msg: 'Tag eliminado',
        deletedTag
    });
} catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_DELETE_TAG");
}
};

module.exports = {
  createTags,
  getItTags,
  getITagsById,
  updateTag,
  deleteTag
 

};
