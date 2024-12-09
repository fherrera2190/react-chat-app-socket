/**Path api/messages */

const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-token");
const { obtainChat } = require("../controllers/messages");

const router = Router();

router.get("/:from", validateJWT, obtainChat);

module.exports = router;
