const { userConnected, userDisconnected } = require("../controllers/sockets");
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

      //validate jwt
      //if is not valid, disconnect
      //to know if the user is active through uid
      // emit all users connected
      // socket join
      // listen when the user sends a message
      //message-personal
      //disconnect
      //mark in the db that the user is offline

      // socket.on("mensaje-to-server", (data) => {

      // });

      socket.on("disconnect",async () => {
        console.log("Cliente desconectado");
        await userDisconnected(uid);
      });
    });
  }
}

module.exports = Sockets;
