const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { PythonShell } = require("python-shell");
const { launchPyshell } = require("./python-node");

const app = express();

app.get("/", (req, res) => res.sendFile(`${__dirname}/views/index.html`));

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
  const { url } = socket.request;
  console.log(`connected : ${url} : server`);
  console.log("here");
  socket.on("data", (data, self) => {
    //console.log(data)
    launchPyshell(data, socket);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(3000, () => console.log(`listening on port : ${PORT}`));
app.use("/static", express.static("public"));
