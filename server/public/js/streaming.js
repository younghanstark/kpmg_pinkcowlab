//streamer

var video = document.querySelector("video");

var canvas = document.getElementById("canvas");
canvas.height = height;
canvas.width = width;
var ctx = canvas.getContext("2d");
var sendFile = new Blob();

video.addEventListener(
  "play",
  function () {
    draw(this, ctx, constraints.video.width, constraints.video.height);
  },
  false
);

function draw(video, ctx, width, height) {
  ctx.drawImage(video, 0, 0, width, height);
  canvas.toBlob((blob) => {
    sendFile = blob;
  });
  setTimeout(draw, 10, video, ctx, width, height);
}

setInterval(() => {
  //console.log(sendString)
  ws_client.emit("data", sendFile);
  //console.log(sendString);
}, 300);
