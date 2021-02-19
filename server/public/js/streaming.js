//streamer

var video = document.querySelector("video");

var canvas = document.getElementById("canvas");
canvas.height = height;
canvas.width = width;
var ctx = canvas.getContext("2d");
var sendString = "";

video.addEventListener(
  "play",
  function () {
    draw(this, ctx, constraints.video.width, constraints.video.height);
  },
  false
);

function draw(video, ctx, width, height) {
  ctx.drawImage(video, 0, 0, width, height);
  sendString = canvas.toDataURL();
  setTimeout(draw, 1, video, ctx, width, height);
}

setInterval(() => {
  //console.log(sendString)
  ws_client.emit("data", sendString);
  //console.log(sendString);
}, 300);
