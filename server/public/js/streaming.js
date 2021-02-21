//streamer

var body = document.body;
var video = document.getElementById("vid");
var sendString = "";
var streamingId = null;
var stopButton = document.getElementById("stop-button");
var startButton = document.getElementById("start-button");
var canvas = document.getElementById("canvas");
var canvas_ph2 = document.getElementById("ph2-canvas");

var ctx_ph2 = canvas_ph2.getContext("2d");
var ctx_ph3 = canvas.getContext("2d");
var body = document.body;
var mask_recognition = "true";

video.addEventListener(
  "play",
  function () {
    console.log("draw");
    draw(video, ctx_ph2, canvas.width, canvas.height);
    draw(video, ctx_ph3, canvas.width, canvas.height);
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
  streamingStatus = true;
  console.log("start");
  draw(video, ctx, canvas.width, canvas.height);

  streamingId = setInterval(() => {
    ////console.log(sendString);
    //console.log(sendString);
    mask_recognition = "true";
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

function included(dx, dy, dw, dh, x, y, w, h) {
  if (dx < x && x + w < dx + dw) {
    if (dy < y && y + h < dy + dh) {
      return true;
    }
  }
  return false;
}



let mask = "true";

ws_client.on("src", (newS) => {
  //console.log(newS);
  // set the base64 string to the src tag of the image
  ctx_result.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
  if (streamingStatus) {
    // imageR.src = newS;
    console.log(newS);
    var coord = newS.split(",");
    ctx_result.strokeStyle = "#ffbb00";

    var resbox1 = document.getElementById("res-box1").children;
    var resbox2 = document.getElementById("res-box2").children;
    var resbox3 = document.getElementById("res-box3").children;
    resbox1[1].innerText = "true";
    resbox2[1].innerText = "true";
    resbox3[1].innerText = "true";

    for (var i = 0; i < coord.length / 5; i++) {
      var x = parseInt(coord[1 + i * 5 + 1]);
      var y = parseInt(coord[1 + i * 5 + 2]);
      var w = parseInt(coord[1 + i * 5 + 3]);
      var h = parseInt(coord[1 + i * 5 + 4]);

      if (box1cur && included(recTLX1, recTLY1, cropWidth1, cropHeight1, x, y, w, h)) {
        ctx_result.strokeRect(x, y, w, h);
        resbox1[1].innerText = "false";
        console.log("aaaaa");
      }
      if (box2cur && included(recTLX2, recTLY2, cropWidth2, cropHeight2, x, y, w, h)) {
        ctx_result.strokeRect(x, y, w, h);
        resbox2[1].innerText = "false";
      }
      if (box3cur && included(recTLX3, recTLY3, cropWidth3, cropHeight3, x, y, w, h)) {
        ctx_result.strokeRect(x, y, w, h);
        resbox3[1].innerText = "false";
      }
    }
    mask = "false";
    ws_client.emit("result", mask);
  }
});

ws_client.on("clear", (clear) => {
  console.log("clear");
  ctx_result.clearRect(0, 0, width, height);
  mask = "true";
  ws_client.emit("result", mask);
});
