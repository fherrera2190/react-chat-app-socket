const User = require("../models/user");
const Message = require("../models/message");
const userConnected = async (uid) => {
  const user = await User.findById(uid);
  user.onLine = true;
  await user.save();
  return user;
};

const userDisconnected = async (uid) => {
  const user = await User.findById(uid);
  user.onLine = false;
  await user.save();
  return user;
};

const getUsers = async () => {
  const users = await User.find().sort("-onLine");
  return users;
};

const saveMessage = async (payload) => {
  try {
    const message = new Message(payload);
    await message.save();
    return message;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

module.exports = {
  userConnected,
  userDisconnected,
  getUsers,
  saveMessage,
};
