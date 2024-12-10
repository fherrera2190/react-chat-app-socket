const {
  userConnected,
  userDisconnected,
  getUsers,
  saveMessage,
} = require("../controllers/sockets");
const { verifyJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", async (socket) => {
      const token = socket.handshake.query["x-token"];

      const [valid, uid] = verifyJWT(token);

      if (!valid) {
        console.log("Socket no identificado");
        return socket.disconnect();
      }

      await userConnected(uid);

      socket.join(uid);

      this.io.emit("list-users", await getUsers());

      socket.on("personal-message", async (payload) => {
        const message = await saveMessage(payload);
        this.io.to(payload.to).emit("personal-message", message);
        this.io.to(payload.from).emit("personal-message", message);
      });

      socket.on("disconnect", async () => {
        console.log("Cliente desconectado");
        await userDisconnected(uid);
        this.io.emit("list-users", await getUsers());
      });
    });
  }
}

module.exports = Sockets;
