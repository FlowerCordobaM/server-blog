const { matchedData } = require("express-validator");
const { handleHttpError } = require("../../../shared/helpers/handleError");
const { tracksModel } = require("../models");

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);

    // Verificar si ya existe una pista con el mismo nombre
    const existingTrack = await tracksModel.findOne({ name: body.name });

    // Si existe, retornar un error
    if (existingTrack) {
      return handleHttpError(res, "ERROR_IS_READY_TRACK");
    }

    // Obtener la información del usuario autenticado
    const { _id, name, email, profession } = req.user;

    // Agregar información específica del usuario al cuerpo de la pista
    body.user = { _id, name, email, profession };

    // Crear la pista
    const data = await tracksModel.create(body);

    // Devolver la respuesta con la información específica del usuario
    res.send({ data, createdBy: { _id, name, email, profession } });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_TRACK");
  }
};

module.exports = { createItem };
