const { matchedData } = require("express-validator");
const { handleHttpError } = require("../../../shared/helpers/handleError");
const { tracksModel } = require("../models");

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findOneAndUpdate(id, body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_TRACK");
  }
};

module.exports = { updateItem };
