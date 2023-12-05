const { tracksModel } = require("../models");
const { handleHttpError } = require("../../../shared/helpers/handleError");
const { userModel } = require("../../user/models");

const getItems = async (req, res) => {
  try {
    // Página y límite por página
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Campos específicos a seleccionar
    const fieldsToSelect = ['_id','name', 'artist', 'nationality'];

    // Consulta con paginación y campos seleccionados
    const data = await tracksModel
      .find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .select(fieldsToSelect);

    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_TRACK");
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params; // Modifica para obtener el ID de los parámetros en lugar de usar matchedData
    const data = await tracksModel.findById(id);

    if (!data) {
      return handleHttpError(res, "ERROR_GET:ID_TRACK_NOT_FOUND", 404);
    }

    // Obtener información del usuario creador (si existe)
    const createdBy = await userModel.findById(data.user);

    // Incluir la información del usuario en la respuesta
    res.send({ data, createdBy });
  } catch (error) {
    console.error(error); // Agrega esta línea para imprimir el error en la consola
    handleHttpError(res, "ERROR_GET:ID_TRACK");
  }
};

module.exports = { getItems, getItemById };

