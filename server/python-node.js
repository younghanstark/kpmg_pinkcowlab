import { PythonShell } from "python-shell";
let options = {
  pythonPath: "/usr/local/bin/python3",
  scriptPath: "../../core",
};

export default function launchPyshell(data) {
  let pyshell = new PythonShell("test.py", options);

  // sends a message to the Python script via stdin
  pyshell.send(data);

  pyshell.on("message", function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
  });

  // end the input stream and allow the process to exit
  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log("The exit code was: " + code);
    console.log("The exit signal was: " + signal);
    console.log("finished");
  });
}

// options.args[0] = data;
// PythonShell.run("opencv_test_webcam_web.py", options, function (err, result) {
//   if (err) throw err;
//   //console.log(result);
//   socket.emit("src", result[0]);
//   socket.emit("warn", result[1]);
// });
