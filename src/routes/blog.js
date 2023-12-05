const express = require("express");
const {
  createBlog,
  deleteBlog,
  getIBlogById,
  getItBlog,
  updateBlog,
  getAllBlog,
} = require("../modules/blog/controllers/createBlog");
const { validatorCreateBlog,validatorUpdateBlog } = require("../modules/blog/validators/blog");
const authMiddleware = require("../shared/middlewares/session");
const checkRol = require("../shared/middlewares/rol");
const router = express.Router();

// routes publics
router.get("/all", getAllBlog );
router.get("/:id", getIBlogById);
// // routes private
router.post("/create", [authMiddleware,checkRol(['USER_ROLE','USER_ADMIN']),validatorCreateBlog], createBlog);
router.put("/:id", [authMiddleware,checkRol(['USER_ROLE','USER_ADMIN']),validatorUpdateBlog], updateBlog);
router.delete("/:id", [authMiddleware,checkRol(['USER_ROLE','USER_ADMIN']),], deleteBlog);
module.exports = router;
