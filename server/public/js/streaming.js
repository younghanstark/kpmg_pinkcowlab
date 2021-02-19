//streamer

var body = document.body;
var canvas = document.getElementById("canvas");
var height = video.height;
var width = video.width;
console.log(video);
canvas.height = height;
canvas.width = width;
console.log(height, width);
var ctx = canvas.getContext("2d");
var sendString = "";
var streamingId = null;
var stopButton = document.getElementById("stop-button");
var startButton = document.getElementById("start-button");

video.addEventListener(
  "play",
  function () {
    ctx.drawImage(video, 0, 0, width, height);
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
