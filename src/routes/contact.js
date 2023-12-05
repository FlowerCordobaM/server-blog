const express = require("express");
const { validatorSendMessage,validatorGetMessage } = require("../modules/contact/validators/contact");
const { createMessage,deleteMessage,getIMessageById,getItMessage } = require("../modules/contact/controllers/send");
const authMiddleware = require("../shared/middlewares/session");
const checkRol = require("../shared/middlewares/rol");
const router = express.Router();

// routes public
router.post("/send",validatorSendMessage,createMessage );

// routes privates
router.get("/:id",[authMiddleware,validatorGetMessage],getIMessageById );
router.get("/all",[authMiddleware], getItMessage);
router.delete("/:id",[authMiddleware,checkRol(['admin']),validatorGetMessage],deleteMessage);

module.exports = router;
