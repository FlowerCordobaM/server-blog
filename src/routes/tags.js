const express = require("express");
const authMiddleware = require("../shared/middlewares/session");
const checkRol = require("../shared/middlewares/rol");
const {createTags,getItTags,getITagsById,deleteTag,updateTag} = require("../modules/tags/controllers/tags");
const {validatorCreaTags,validatorUpdaTags} = require("../modules/tags/validators/tags");

const router = express.Router();

// routes public
router.get("/all",[],getItTags );
router.get("/:id",[],getITagsById );

// routes privates
router.post("/create",[authMiddleware,checkRol(['USER_ROLE','USER_ADMIN']),validatorCreaTags], createTags);
router.put("/:id",[authMiddleware,checkRol(['USER_ROLE','USER_ADMIN'])],validatorUpdaTags, updateTag);
router.delete("/:id",[authMiddleware,checkRol(['USER_ROLE','USER_ADMIN'])],deleteTag);

module.exports = router;
