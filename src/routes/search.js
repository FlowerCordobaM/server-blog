const express = require("express");
const {  searchAll,searchInCollection} = require("../modules/search/controllers/search");
const authMiddleware = require("../shared/middlewares/session");
const checkRol = require("../shared/middlewares/rol");
const router = express.Router();

// Ruta para búsqueda global
router.get("/:busqueda", [authMiddleware, checkRol(['USER_ROLE', 'USER_ADMIN'])],searchAll );
router.get("/coleccion/:tabla/:busqueda", [authMiddleware, checkRol(['USER_ROLE', 'USER_ADMIN'])], searchInCollection);

// Puedes agregar aquí la ruta para buscar en colecciones específicas si lo necesitas

module.exports = router;
