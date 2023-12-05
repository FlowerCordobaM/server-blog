const { storageModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../../../shared/helpers/handleError");
const createFile = async (req, res) => {
    try {
      const body = matchedData(req);
      const data = await storageModel.create(body);
      res.send({ data });
    } catch (error) {
      handleHttpError(res, "ERROR_CREATE_FILE");
    }
  };
  const updateFile = async (req, res) => {
    try {
      const { id, ...body } = matchedData(req);
      const data = await storageModel.findOneAndUpdate(id, body);
      res.send({ data });
    } catch (error) {
      handleHttpError(res, "ERROR_UPDATE_FILE");
    }
  };
  const getItFile = async (req, res) => {
    try {
      const data = await storageModel.find({});
      res.send({ data });
    } catch (error) {
      handleHttpError(res, "ERROR_GET_FILE");
    }
  };
  const getIFileById = async (req, res) => {
    try {
      req = matchedData(req);
      const { id } = req;
      const data = await storageModel.findById(id);
      res.send({ data });
    } catch (error) {
      handleHttpError(res, "ERROR_GET:ID_FILE");
    }
  };
  const deleteFile =async (req,res)=>{
      try {
          req = matchedData(req);
          const {id}=req
          const data = await storageModel.delete({_id:id});
          res.send({ data });
        } catch (error) {
          handleHttpError(res, "ERROR_DELETE_FILE");
        }
  }
module.exports ={deleteFile,getIFileById,getItFile,updateFile,createFile}