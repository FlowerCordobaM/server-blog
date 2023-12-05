const express = require("express");
const { validatorLogin,validatorRegister} = require("../modules/auth/validators/auth");
const { handle_signup} = require("../modules/auth/controllers/signup");
const { handle_signig,handle_google_signIn} = require("../modules/auth/controllers/signin");

const router = express.Router();

router.post("/signup",[validatorRegister],handle_signup);

router.post("/signin",[validatorLogin],handle_signig);
router.post("/signin/google",handle_google_signIn);
router.post("/signout",[validatorLogin],handle_signig);

module.exports = router;
