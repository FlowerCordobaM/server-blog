const express = require("express");
const { createItem } = require("../modules/tracks/controllers/createItem ");
const { updateItem } = require("../modules/tracks/controllers/update-item");
const { getItems,getItemById} = require("../modules/tracks/controllers/get-items");
const { deleteItem } = require("../modules/tracks/controllers/delete-item");
const { validatorCreateItem, validatorGetItem } = require("../modules/tracks/validators/tracks");
const authMiddleware = require("../shared/middlewares/session");
const checkRol = require("../shared/middlewares/rol");
// const customHeader = require("../shared/middlewares/customHeader");

const router = express.Router();

// rutas privadas

router.get("/all",[authMiddleware,checkRol(['admin'])],getItems);
router.get("/:id",[authMiddleware], getItemById);

// private
router.post("/create",[authMiddleware,checkRol(['admin']),validatorCreateItem], createItem);
router.put("/:id",[authMiddleware,checkRol(['admin']),validatorCreateItem, validatorGetItem],updateItem );
router.delete("/:id",[authMiddleware,checkRol(['admin']),validatorGetItem], deleteItem);

module.exports = router;
