const express = require("express");
const file = require("express-fileupload");
const authMiddleware = require("../shared/middlewares/session");
const checkRol = require("../shared/middlewares/rol");
const { fileUpload,getFile } = require("../modules/uploads/controllers/uploads");
const router = express.Router();


router.use(file())
// routes public
router.post("/:type/:id",[authMiddleware,checkRol(['USER_ROLE','USER_ADMIN'])],fileUpload );
router.get("/:type/:img",[authMiddleware,checkRol(['USER_ROLE','USER_ADMIN'])], getFile);

module.exports = router;
