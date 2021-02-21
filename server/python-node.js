const { PythonShell } = require("python-shell");

let options = {
  pythonPath: "/usr/bin/python3",
  scriptPath: "../core",
};

function launchPyshell(data, socket) {
  let pyshell = new PythonShell("opencv_test_webcam_web.py", options);
  let mask = "true";

  // sends a message to the Python script via stdin
  pyshell.send(data);

  pyshell.on("message", function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    ////console.log(message);
    var isData = message.indexOf("data");

    ////console.log("isdata : ", isData);
    if (isData != -1) {
      socket.emit("src", message);
    } else if (message == "") {
      socket.emit("clear", message);
    }
  });

  // end the input stream and allow the process to exit
  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    //console.log("The exit code was: " + code);
    //console.log("The exit signal was: " + signal);
    //console.log("finished");
  });
}

// options.args[0] = data;
// PythonShell.run("opencv_test_webcam_web.py", options, function (err, result) {
//   if (err) throw err;
//   ////console.log(result);
//   socket.emit("src", result[0]);
//   socket.emit("warn", result[1]);
// });

module.exports = { launchPyshell };
