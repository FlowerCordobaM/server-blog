const { tracksModel } = require("../models");
const { handleHttpError } = require("../../../shared/helpers/handleError");
const { matchedData } = require("express-validator");

const deleteItem =async (req,res)=>{
    try {
        req = matchedData(req);
        const {id}=req
        const data = await tracksModel.delete({_id:id});
        res.send({ data });
      } catch (error) {
        handleHttpError(res, "ERROR_DELETE_TRACK");
      }
}

module.exports ={deleteItem}