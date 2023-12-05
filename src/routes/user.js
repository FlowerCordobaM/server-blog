const express = require("express");
const { getItUsers,updateUser,deleteUser,createUser } = require("../modules/user/controllers/user");
const {validatorUpdateUser, validatorRegisterAdmin} = require("../modules/user/validators/user");
const authMiddleware = require("../shared/middlewares/session");
const checkRol = require("../shared/middlewares/rol");

const router = express.Router();


// routes priavte
router.get("/all",authMiddleware, checkRol(['USER_ROLE','USER_ADMIN']),getItUsers);
router.post("/create/admin",authMiddleware, checkRol(['USER_ADMIN']),validatorRegisterAdmin,createUser);
router.put("/:id",[authMiddleware,checkRol(['USER_ADMIN']),validatorUpdateUser],updateUser);
router.delete("/:id",[authMiddleware,checkRol(['USER_ADMIN'])],deleteUser);


module.exports = router;
