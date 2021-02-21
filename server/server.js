const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { PythonShell } = require("python-shell");
let options = {
  pythonPath: "/usr/local/bin/python3",
  scriptPath: "../core",
  args: [""],
};

const app = express();

var template = require('./public/js/template');
var fs = require('fs');
var url = require('url');

app.get("/", function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var title = queryData.content;

  if (_url == '/') {
    title = 'home';
  }
  if (_url == '/favicon.ico') {
    return response.writeHead(404);
  }
  title += '.html';
  
  fs.readFile(`./views/${title}`, 'utf8', function(err, description){
    var html = template.HTML(description);
    response.end(html);
  });
});

const server = http.createServer(app);

const io = socketio(server);
io.on("connection", (socket) => {
  const { url } = socket.request;
  console.log(`connected : ${url} : server`);
  socket.on("data", (data) => {
    //console.log(data)
    options.args[0] = data;
    PythonShell.run(
      "opencv_test_webcam_web.py",
      options,
      function (err, result) {
        if (err) throw err;
        //console.log(result);
        socket.emit("src", result[0]);
        socket.emit("warn", result[1]);
      }
    );
  });
});

const PORT = process.env.PORT || 3000;

server.listen(3000, () => console.log(`listening on port : ${PORT}`));
app.use("/static", express.static("public"));
app.use("/views", express.static("views"));
