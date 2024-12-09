/**
 *api/login
 */
const { Router } = require("express");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const loginValidation = require("../validations/login.validation");
const registerValidations = require("../validations/register.validations");
const { validateJWT } = require("../middlewares/validate-token");
const router = Router();

router.post("/new", registerValidations, createUser);

router.post("/", loginValidation, loginUser);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
