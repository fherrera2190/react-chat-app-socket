const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

module.exports = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  validateFields,
];
