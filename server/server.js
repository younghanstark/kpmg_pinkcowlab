const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { PythonShell } = require("python-shell");
const { launchPyshell } = require("./python-node");

const app = express();

let mask = "true";

var template = require("./public/js/template");
var fs = require("fs");
var url = require("url");

https: app.get("/", function (request, response) {
  const ip =
    request.headers["x-forwarded-for"] || request.connection.remoteAddress;
  console.log(ip);

  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var title = queryData.content;

  if (_url == "/") {
    title = "home";
  }
  if (_url == "/favicon.ico") {
    return response.writeHead(404);
  }
  title += ".html";

  fs.readFile(`./views/${title}`, "utf8", function (err, description) {
    var html = template.HTML(description);
    response.end(html);
  });
});

app.get("/api", (req, res) => {
  return res.send(mask);
});

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
  const { url } = socket.request;
  //console.log(`connected : ${url} : server`);
  //console.log("here");
  socket.on("data", (data, self) => {
    ////console.log(data)
    launchPyshell(data, socket);
  });
  socket.on("result", (data, self) => {
    mask = data;
  });
});

const PORT = process.env.PORT || 3000;

server.listen(3000, () => console.log(`listening on port : ${PORT}`));
app.use("/static", express.static("public"));
app.use("/views", express.static("views"));
