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

    
    //DB Mongo
    dbConnection();

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
    // this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(express.json());
    this.app.use("/api/login", require("../router/auth"));
    this.app.use("/api/messages", require("../router/messages"));
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
