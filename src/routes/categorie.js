const express = require("express");
const authMiddleware = require("../shared/middlewares/session");
const checkRol = require("../shared/middlewares/rol");
const { getItcategories,createCategorie,getIcategoriesById,updatecategorie,deletecategorie } = require("../modules/category/controllers/category");
const { validatorCreaCategory,validatorUpdaCategory } = require("../modules/category/validators/category");
const router = express.Router();

// routes public
router.get("/all", getItcategories);
router.get("/:id",getIcategoriesById );


// routes privates
router.post("/create",[authMiddleware,checkRol(['USER_ROLE','USER_ADMIN']),validatorCreaCategory], createCategorie );
router.put("/:id",[authMiddleware,checkRol(['USER_ROLE','USER_ADMIN']),validatorUpdaCategory],updatecategorie );
router.delete("/:id",[authMiddleware,checkRol(['USER_ROLE','USER_ADMIN'])],deletecategorie);

module.exports = router;
