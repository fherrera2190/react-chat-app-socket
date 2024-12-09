const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

module.exports = [
  check("name", "Name is required").not().isEmpty().isLength({ min: 3 }),
  check("email", "Email is required").isEmail().notEmpty(),
  check("password", "Password is required").isLength({ min: 6 }),
  validateFields,
];
