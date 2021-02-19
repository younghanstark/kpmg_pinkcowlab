var mainCanvas = document.getElementById("canvas");
var ctx = mainCanvas.getContext("2d");

mainCanvas.onmousedown = function (event) {
  var topLeftX = event.offsetX;
  var topLeftY = event.offsetY;

  function updateRec(event) {
    ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    ctx.drawImage(video, 0, 0, mainCanvas.width, mainCanvas.height);
    var bottomRightX = event.offsetX;
    var bottomRightY = event.offsetY;
    var recTLX = Math.min(topLeftX, bottomRightX);
    var recTLY = Math.min(topLeftY, bottomRightY);
    var recBRX = Math.max(topLeftX, bottomRightX);
    var recBRY = Math.max(topLeftY, bottomRightY);

    ctx.strokeRect(recTLX, recTLY, recBRX - recTLX, recBRY - recTLY);

    document.getElementById("rec-xvalue").innerHTML = recTLX;
    document.getElementById("rec-yvalue").innerHTML = recTLY;
    document.getElementById("rec-width").innerHTML = recBRX - recTLX;
    document.getElementById("rec-height").innerHTML = recBRY - recTLY;
  }

  mainCanvas.addEventListener("mousemove", updateRec);

  mainCanvas.onmouseup = function (event) {
    mainCanvas.removeEventListener("mousemove", updateRec);
  };
};

var clearButton = document.getElementById("clear-button");
clearButton.onclick = function () {
  ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  document.getElementById("rec-xvalue").innerHTML = "<br>";
  document.getElementById("rec-yvalue").innerHTML = "<br>";
  document.getElementById("rec-width").innerHTML = "<br>";
  document.getElementById("rec-height").innerHTML = "<br>";
};
