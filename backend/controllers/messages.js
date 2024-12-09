const Message = require("../models/message");

const obtainChat = async (req, res) => {
  try {
    const messagesFrom = req.params.from;
    const userId = req.uid;

    const last30 = await Message.find({
      $or: [
        { from: userId },
        { to: messagesFrom },
        { from: messagesFrom, to: userId },
      ],
    })
      .sort({ createdAt: "desc" })
      .limit(30);

    res.json({
      ok: true,
      userId,
      messagesFrom,
      last30,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: "Contact with the administrator",
    });
  }
};

module.exports = {
  obtainChat,
};
