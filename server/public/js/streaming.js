//streamer

var body = document.body;
var video = document.getElementById("vid");
var sendString = "";
var streamingId = null;
var stopButton = document.getElementById("stop-button");
var startButton = document.getElementById("start-button");

video.addEventListener(
  "play",
  function () {
    console.log("draw");
    ctx.drawImage(video, 0, 0, width, height);
    console.log(height, width);
  },
  false
);

function draw(video, ctx, width, height) {
  ctx.drawImage(video, 0, 0, width, height);
  sendString = canvas.toDataURL();
  streamingId = setTimeout(draw, 10, video, ctx, width, height);
  //console.log(streamingId);
}

console.log("checked");

stopButton.onclick = () => {
  console.log("stop");
  ctx.drawImage(video, 0, 0, width, height);
  // console.log(streamingId);
  if (streamingId != null) {
    clearTimeout(streamingId);
  }
  body.style.setProperty("--background-color", "green");
};

console.log(stopButton);

console.log("checked");

startButton.onclick = () => {
  console.log("start");
  draw(video, ctx, constraints.video.width, constraints.video.height);
};

console.log(startButton);

// function stop(ctx, width, height) {
//   ctx.clearRect(0, 0, width, height);
//   ctx.beginPath();
//   clearTimeout(streamingId);
// }

setInterval(() => {
  ////console.log(sendString);
  ws_client.emit("data", sendString);
  ////console.log(sendString);
}, 1000);
