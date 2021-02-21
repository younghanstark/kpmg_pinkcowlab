//streamer

var body = document.body;
var video = document.getElementById("vid");
var sendString = "";
var streamingId = null;
var stopButton = document.getElementById("stop-button");
var startButton = document.getElementById("start-button");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var body = document.body;

video.addEventListener(
  "play",
  function () {
    console.log("draw");
    draw(video, ctx, canvas.width, canvas.height);
    console.log(height, width);
  },
  false
);

function draw(video, ctx, width, height) {
  ctx.save();
  ctx.scale(-1, 1);
  ctx.translate(-1 * width, 0);
  ctx.drawImage(video, 0, 0, width, height);
  ctx.restore();

  sendString = canvas.toDataURL();
  setTimeout(draw, 10, video, ctx, width, height);
  //console.log(streamingId);
}

console.log("checked");

stopButton.onclick = () => {
  stop();
};

function stop() {
  console.log("stop");
  streamingStatus = false;
  ctx.drawImage(video, 0, 0, width, height);

  console.log(streamingId);
  if (streamingId != null) {
    clearTimeout(streamingId);
    streamingId = null;
  }
  console.log(streamingId);
  body.style.setProperty("--background-color", "green");
}

console.log(stopButton);

console.log("checked");

startButton.onclick = () => {
  if (!areaSet) {
    var anotherDiv = document.getElementById("clear-alert");
    anotherDiv.style.display = "none";

    var alertDiv = document.getElementById("set-alert");
    alertDiv.style.display = "block";
    alertDiv.classList.remove("shake");
    alertDiv.offsetWidth = alertDiv.offsetWidth;
    alertDiv.classList.add("shake");
    return;
  }
  streamingStatus = true;
  console.log("start");
  draw(video, ctx, canvas.width, canvas.height);

  streamingId = setInterval(() => {
    ////console.log(sendString);
    //console.log(sendString);
    ws_client.emit("data", sendString);
    ////console.log(sendString);
  }, 500);
};

console.log(startButton);

// function stop(ctx, width, height) {
//   ctx.clearRect(0, 0, width, height);
//   ctx.beginPath();
//   clearTimeout(streamingId);
// }

//client

ws_client.on("src", (newS) => {
  //console.log(newS);
  // set the base64 string to the src tag of the image
  ctx_result.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
  if (streamingStatus) {
    // imageR.src = newS;
    console.log(newS);
    var coord = newS.split(",");
    ctx_result.strokeStyle = "#ff0000";

    for (var i = 0; i < coord.length / 5; i++) {
      var curx = parseInt(coord[1 + i * 5 + 1]);
      var cury = parseInt(coord[1 + i * 5 + 2]);
      var curw = parseInt(coord[1 + i * 5 + 3]);
      var curh = parseInt(coord[1 + i * 5 + 4]);

      if (included(curx, cury, curw, curh)) {
        ctx_result.strokeRect(curx, cury, curw, curh);
      }
    }
  }

  ////console.log(newS)
});

function included(x, y, w, h) {
  if (recTLX < x && x + w < recTLX + cropWidth) {
    if (recTLY < y && y + h < recTLY + cropHeight) {
      return true;
    }
  }
  return false;
}
