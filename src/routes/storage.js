const { createFile,deleteFile,getIFileById,getItFile,updateFile } = require("../modules/storage/controllers/createFile");
const { validatorGetItem } = require("../modules/storage/validators/storage");
const uploadMiddleware = require("../shared/helpers/handleStorage");

const express = require("express");
const authMiddleware = require("../shared/middlewares/session");
const router = express.Router();
// routes publico
router.get("/all",authMiddleware, getItFile);
router.get("/:id", [authMiddleware,validatorGetItem],getIFileById);

// private
router.post("/file",authMiddleware, uploadMiddleware.single("myfile"),createFile );
router.put("/:id",[authMiddleware,validatorGetItem],updateFile);
router.delete("/:id", [authMiddleware,validatorGetItem],deleteFile);

module.exports = router;
