const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");
const createUser = async (req, res = response) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const existsUser = await User.findOne({ email });

    if (existsUser) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists",
      });
    }

    const encryptedPassword = await bcrypt.hashSync(password, 10);
    const user = new User({ name, email, password: encryptedPassword });

    await user.save();

    //generate JWT

    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact with the administrator",
    });
  }
};

const loginUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Invalid credentials",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Invalid credentials",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact with the administrator",
    });
  }
};

const renewToken = async (req, res) => {
  const uid = req.uid;

  const token = await generateJWT(uid);

  const user = await User.findById(uid);

  res.json({
    ok: true,
    token,
    user,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
