var mainCanvas = document.getElementById("area-canvas");
var ctx_area = mainCanvas.getContext("2d");
var recTLX,
  recTLY,
  recBRX,
  recBRY = 0;
var cropWidth,
  cropHeight = 0;
var cropCanvas = document.getElementById("canvas-crop");
cropCanvas.height = cropHeight;
cropCanvas.width = cropWidth;
var cropCtx = cropCanvas.getContext("2d");
var areaSet = false;
var streamingStatus = false;

mainCanvas.onmousedown = function (event) {
  console.log(event);

  var topLeftX = event.offsetX;
  var topLeftY = event.offsetY;

  function updateRec(event) {
    ctx_area.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    //ctx_area.drawImage(video, 0, 0, mainCanvas.width, mainCanvas.height);
    var bottomRightX = event.offsetX;
    var bottomRightY = event.offsetY;
    recTLX = Math.min(topLeftX, bottomRightX);
    recTLY = Math.min(topLeftY, bottomRightY);
    recBRX = Math.max(topLeftX, bottomRightX);
    recBRY = Math.max(topLeftY, bottomRightY);

    cropWidth = recBRX - recTLX;
    cropHeight = recBRY - recTLY;

    ctx_area.strokeRect(recTLX, recTLY, cropWidth, cropHeight);
  }

  mainCanvas.addEventListener("mousemove", updateRec);

  mainCanvas.onmouseup = function (event) {
    mainCanvas.removeEventListener("mousemove", updateRec);
  };
};

function CropImage() {
  var canvas = document.getElementById("canvas");

  img = new Image();

  img.onload = function () {
    var canvas = document.getElementById("canvas-crop");
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(
      img,
      recTLX,
      recTLY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );
  };

  img.src = canvas.toDataURL();
}

var setButton = document.getElementById("set-button");
setButton.onclick = () => {
  if (cropHeight == 0) {
    var anotherDiv = document.getElementById("clear-alert");
    anotherDiv.style.display = "none";

    var alertDiv = document.getElementById("set-alert");
    alertDiv.style.display = "block";
    alertDiv.classList.remove("shake");
    alertDiv.offsetWidth = alertDiv.offsetWidth;
    alertDiv.classList.add("shake");
    return;
  }
  console.log("crop");
  CropImage();
  areaSet = true;
};
var clearButton = document.getElementById("clear-button");

clearButton.onclick = function () {
  if (streamingStatus) {
    var anotherDiv = document.getElementById("set-alert");
    anotherDiv.style.display = "none";

    var alertDiv = document.getElementById("clear-alert");
    alertDiv.style.display = "block";
    alertDiv.classList.remove("shake");
    alertDiv.offsetWidth = alertDiv.offsetWidth;
    alertDiv.classList.add("shake");
    return;
  }
  cropCtx.clearRect(0, 0, cropWidth, cropHeight);
  ctx_area.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  cropHeight = 0;
  cropWidth = 0;
  recTLX = 0;
  recTLY = 0;
  recBRX = 0;
  recBRY = 0;
  areaSet = false;
};
