const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    dbConnection();

    //DB Mongo

    //http server
    this.server = http.createServer(this.app);

    this.io = socketio(this.server, {
      /*Configuraciones */
      cors: {
        origin: "*",
      },
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }
  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();

    this.configSockets();

    this.server.listen(this.port, () => {
      console.log(`listening on ${this.port}`);
    });
  }
}

module.exports = Server;
