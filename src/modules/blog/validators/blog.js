const { check } = require("express-validator");
const validateResults = require("../../../shared/helpers/handleValidator");

const validatorCreateBlog = [
  check("title").exists().notEmpty(),
  check("desc_short").exists().notEmpty(),
  check("desc_long").exists().notEmpty(),
  check("categorie").isMongoId(),
  check("tag").isMongoId(),
  
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorUpdateBlog = [
  check("title").exists().notEmpty(),
  check("desc_short").exists().notEmpty(),
  check("desc_long").exists().notEmpty(),
  check("categorie",).isMongoId(),
  check("tag").isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];


module.exports = { validatorCreateBlog, validatorUpdateBlog, };
