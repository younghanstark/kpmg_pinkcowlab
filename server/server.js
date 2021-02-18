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

app.get("/", (req, res) => res.sendFile(`${__dirname}/views/index.html`));

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
