const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No token in the request",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = payload.uid;
    return next();
    
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
