const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { PythonShell } = require("python-shell");
const { launchPyshell } = require("./python-node");

const app = express();

let mask_api = {};

var template = require("./public/js/template");
var fs = require("fs");
var url = require("url");

app.get("/", function (request, response) {
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

app.get(`/api/:userName`, (req, res) => {
  var userName = req.params.userName;
  req.responseType = "json";
  if (userName in mask_api) {
    let result_object = {};
    let dataResult = mask_api[userName].split(":");

    for (var i = 0; i < dataResult.length / 2; i++) {
      result_object[dataResult[2 * i]] = dataResult[2 * i + 1];
    }

    return res.send(JSON.stringify(result_object));
  } else {
    return res.writeHead(404);
  }
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
    let maskStatus = data.split(",");
    //console.log(mask_api);

    mask_api[maskStatus[0]] = maskStatus[1];
  });
});

const PORT = process.env.PORT || 3000;

server.listen(3000, () => console.log(`listening on port : ${PORT}`));
app.use("/static", express.static("public"));
app.use("/views", express.static("views"));
