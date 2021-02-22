function gotoPhase2() {
  var cameraselect = document.getElementById("devices");
  var cur_option = cameraselect.options.selectedIndex;
  var cur_value = cameraselect.options[cur_option].value;
  var name_value = document.getElementById("name").value;

  if (cur_value == "notselected") {
    //console.log("nownownownow");
    var div_alert = document.getElementById("select-alert-camera");
    div_alert.style.display = "block";
    div_alert.classList.remove("shake");
    div_alert.offsetWidth = div_alert.offsetWidth;
    div_alert.classList.add("shake");
  } else if (name_value == "please enter name" || name_value == "") {
    var div_alert = document.getElementById("select-alert-name");
    div_alert.style.display = "block";
    div_alert.classList.remove("shake");
    div_alert.offsetWidth = div_alert.offsetWidth;
    div_alert.classList.add("shake");
  } else {
    var div_phase1 = document.getElementById("phase1");
    div_phase1.style.display = "none";
    var div_phase2 = document.getElementById("phase2");
    div_phase2.style.display = "block";
  }
}

var box1canvas = document.getElementById("area-canvas1");
var box1ctx = box1canvas.getContext("2d");
var box2canvas = document.getElementById("area-canvas2");
var box2ctx = box2canvas.getContext("2d");
var box3canvas = document.getElementById("area-canvas3");
var box3ctx = box3canvas.getContext("2d");

var recTLX1,
  recTLY1,
  recBRX1,
  recBRY1,
  cropWidth1 = 0,
  cropHeight1 = 0;

//drag
box1canvas.onmousedown = function (event) {
  box1ctx.strokeStyle = "red";

  var topLeftX1 = event.offsetX;
  var topLeftY1 = event.offsetY;

  function updateRec(event) {
    box1ctx.clearRect(0, 0, box1canvas.width, box1canvas.height);
    var bottomRightX1 = event.offsetX;
    var bottomRightY1 = event.offsetY;
    recTLX1 = Math.min(topLeftX1, bottomRightX1);
    recTLY1 = Math.min(topLeftY1, bottomRightY1);
    recBRX1 = Math.max(topLeftX1, bottomRightX1);
    recBRY1 = Math.max(topLeftY1, bottomRightY1);

    cropWidth1 = recBRX1 - recTLX1;
    cropHeight1 = recBRY1 - recTLY1;

    box1ctx.strokeRect(recTLX1, recTLY1, cropWidth1, cropHeight1);
  }

  box1canvas.addEventListener("mousemove", updateRec);

  box1canvas.onmouseup = function (event) {
    box1canvas.removeEventListener("mousemove", updateRec);
  };

  box1canvas.onmouseleave = function (event) {
    box1canvas.removeEventListener("mousemove", updateRec);
  };
};

var dom1 = document.getElementById("dom-box1").children;
var box1name = dom1[0].children[0].value;
var box1draw = dom1[1].children[0];
var box1clear = dom1[2].children[0];
var box1cur = false;

var dom2 = document.getElementById("dom-box2").children;
var box2name = dom2[0].children[0].value;
var box2draw = dom2[1].children[0];
var box2clear = dom2[2].children[0];
var box2cur = false;

var dom3 = document.getElementById("dom-box3").children;
var box3draw = dom3[1].children[0];
var box3clear = dom3[2].children[0];
var box3cur = false;

box1draw.onclick = function () {
  box1draw.className = "btn btn-default btn-circle btn-xl btn-selected";
  box2draw.className = "btn btn-default btn-circle btn-xl btn-foo";
  box3draw.className = "btn btn-default btn-circle btn-xl btn-foo";
  box1cur = true;
  box1canvas.style.zIndex = 150;
  box2canvas.style.zIndex = 50;
  box3canvas.style.zIndex = 50;
};
box1clear.onclick = function () {
  if (cropWidth1 != 0 && cropHeight1 != 0) {
    box1cur = false;
    box1ctx.clearRect(0, 0, box1canvas.width, box1canvas.height);
    cropHeight1 = 0;
    cropWidth1 = 0;
    recTLX1 = 0;
    recTLY1 = 0;
    recBRX1 = 0;
    recBRY1 = 0;
  }
};

var recTLX2,
  recTLY2,
  recBRX2,
  recBRY2,
  cropWidth2 = 0,
  cropHeight2 = 0;
box2canvas.onmousedown = function (event) {
  box2ctx.strokeStyle = "green";

  var topLeftX2 = event.offsetX;
  var topLeftY2 = event.offsetY;

  function updateRec(event) {
    box2ctx.clearRect(0, 0, box2canvas.width, box2canvas.height);
    var bottomRightX2 = event.offsetX;
    var bottomRightY2 = event.offsetY;
    recTLX2 = Math.min(topLeftX2, bottomRightX2);
    recTLY2 = Math.min(topLeftY2, bottomRightY2);
    recBRX2 = Math.max(topLeftX2, bottomRightX2);
    recBRY2 = Math.max(topLeftY2, bottomRightY2);

    cropWidth2 = recBRX2 - recTLX2;
    cropHeight2 = recBRY2 - recTLY2;

    box2ctx.strokeRect(recTLX2, recTLY2, cropWidth2, cropHeight2);
  }

  box2canvas.addEventListener("mousemove", updateRec);

  box2canvas.onmouseup = function (event) {
    box2canvas.removeEventListener("mousemove", updateRec);
  };

  box2canvas.onmouseleave = function (event) {
    box2canvas.removeEventListener("mousemove", updateRec);
  };
};

box2draw.onclick = function () {
  box1draw.className = "btn btn-default btn-circle btn-xl btn-foo";
  box2draw.className = "btn btn-default btn-circle btn-xl btn-selected";
  box3draw.className = "btn btn-default btn-circle btn-xl btn-foo";
  box2cur = true;
  box1canvas.style.zIndex = 50;
  box2canvas.style.zIndex = 150;
  box3canvas.style.zIndex = 50;
};
box2clear.onclick = function () {
  if (cropWidth2 != 0 && cropHeight2 != 0) {
    box2cur = false;
    box2ctx.clearRect(0, 0, box2canvas.width, box2canvas.height);
    cropHeight2 = 0;
    cropWidth2 = 0;
    recTLX2 = 0;
    recTLY2 = 0;
    recBRX2 = 0;
    recBRY2 = 0;
  }
};

var recTLX3,
  recTLY3,
  recBRX3,
  recBRY3,
  cropWidth3 = 0,
  cropHeight3 = 0;
box3canvas.onmousedown = function (event) {
  box3ctx.strokeStyle = "blue";

  var topLeftX3 = event.offsetX;
  var topLeftY3 = event.offsetY;

  function updateRec(event) {
    box3ctx.clearRect(0, 0, box3canvas.width, box3canvas.height);
    //ctx_area.drawImage(video, 0, 0, mainCanvas.width, mainCanvas.height);
    var bottomRightX3 = event.offsetX;
    var bottomRightY3 = event.offsetY;
    recTLX3 = Math.min(topLeftX3, bottomRightX3);
    recTLY3 = Math.min(topLeftY3, bottomRightY3);
    recBRX3 = Math.max(topLeftX3, bottomRightX3);
    recBRY3 = Math.max(topLeftY3, bottomRightY3);

    cropWidth3 = recBRX3 - recTLX3;
    cropHeight3 = recBRY3 - recTLY3;

    box3ctx.strokeRect(recTLX3, recTLY3, cropWidth3, cropHeight3);
  }

  box3canvas.addEventListener("mousemove", updateRec);

  box3canvas.onmouseup = function (event) {
    box3canvas.removeEventListener("mousemove", updateRec);
  };

  box3canvas.onmouseleave = function (event) {
    box3canvas.removeEventListener("mousemove", updateRec);
  };
};

box3draw.onclick = function () {
  box1draw.className = "btn btn-default btn-circle btn-xl btn-foo";
  box2draw.className = "btn btn-default btn-circle btn-xl btn-foo";
  box3draw.className = "btn btn-default btn-circle btn-xl btn-selected";
  box3cur = true;
  box1canvas.style.zIndex = 50;
  box2canvas.style.zIndex = 50;
  box3canvas.style.zIndex = 150;
};
box3clear.onclick = function () {
  if (cropWidth3 != 0 && cropHeight3 != 0) {
    box3cur = false;
    box3ctx.clearRect(0, 0, box3canvas.width, box3canvas.height);
    cropHeight3 = 0;
    cropWidth3 = 0;
    recTLX3 = 0;
    recTLY3 = 0;
    recBRX3 = 0;
    recBRY3 = 0;
  }
};
///////////////

//touch
box1canvas.ontouchstart = function (event) {
  box1ctx.strokeStyle = "red";

  var topLeftX1 = event.offsetX;
  var topLeftY1 = event.offsetY;

  function updateRec(event) {
    box1ctx.clearRect(0, 0, box1canvas.width, box1canvas.height);
    var bottomRightX1 = event.offsetX;
    var bottomRightY1 = event.offsetY;
    recTLX1 = Math.min(topLeftX1, bottomRightX1);
    recTLY1 = Math.min(topLeftY1, bottomRightY1);
    recBRX1 = Math.max(topLeftX1, bottomRightX1);
    recBRY1 = Math.max(topLeftY1, bottomRightY1);

    cropWidth1 = recBRX1 - recTLX1;
    cropHeight1 = recBRY1 - recTLY1;

    box1ctx.strokeRect(recTLX1, recTLY1, cropWidth1, cropHeight1);
  }

  box1canvas.addEventListener("touchmove", updateRec);

  box1canvas.ontouchend = function (event) {
    box1canvas.removeEventListener("touchmove", updateRec);
  };
};

var dom1 = document.getElementById("dom-box1").children;
var box1name = dom1[0].children[0].value;
var box1draw = dom1[1].children[0];
var box1clear = dom1[2].children[0];
var box1cur = false;

var dom2 = document.getElementById("dom-box2").children;
var box2name = dom2[0].children[0].value;
var box2draw = dom2[1].children[0];
var box2clear = dom2[2].children[0];
var box2cur = false;

var dom3 = document.getElementById("dom-box3").children;
var box3draw = dom3[1].children[0];
var box3clear = dom3[2].children[0];
var box3cur = false;

var recTLX2,
  recTLY2,
  recBRX2,
  recBRY2,
  cropWidth2 = 0,
  cropHeight2 = 0;

box2canvas.ontouchstart = function (event) {
  box2ctx.strokeStyle = "green";

  var topLeftX2 = event.offsetX;
  var topLeftY2 = event.offsetY;

  function updateRec(event) {
    box2ctx.clearRect(0, 0, box2canvas.width, box2canvas.height);
    var bottomRightX2 = event.offsetX;
    var bottomRightY2 = event.offsetY;
    recTLX2 = Math.min(topLeftX2, bottomRightX2);
    recTLY2 = Math.min(topLeftY2, bottomRightY2);
    recBRX2 = Math.max(topLeftX2, bottomRightX2);
    recBRY2 = Math.max(topLeftY2, bottomRightY2);

    cropWidth2 = recBRX2 - recTLX2;
    cropHeight2 = recBRY2 - recTLY2;

    box2ctx.strokeRect(recTLX2, recTLY2, cropWidth2, cropHeight2);
  }

  box2canvas.addEventListener("touchmove", updateRec);

  box2canvas.ontouchend = function (event) {
    box2canvas.removeEventListener("touchmove", updateRec);
  };
};

var recTLX3,
  recTLY3,
  recBRX3,
  recBRY3,
  cropWidth3 = 0,
  cropHeight3 = 0;
box3canvas.ontouchstart = function (event) {
  box3ctx.strokeStyle = "blue";

  var topLeftX3 = event.offsetX;
  var topLeftY3 = event.offsetY;

  function updateRec(event) {
    box3ctx.clearRect(0, 0, box3canvas.width, box3canvas.height);
    //ctx_area.drawImage(video, 0, 0, mainCanvas.width, mainCanvas.height);
    var bottomRightX3 = event.offsetX;
    var bottomRightY3 = event.offsetY;
    recTLX3 = Math.min(topLeftX3, bottomRightX3);
    recTLY3 = Math.min(topLeftY3, bottomRightY3);
    recBRX3 = Math.max(topLeftX3, bottomRightX3);
    recBRY3 = Math.max(topLeftY3, bottomRightY3);

    cropWidth3 = recBRX3 - recTLX3;
    cropHeight3 = recBRY3 - recTLY3;

    box3ctx.strokeRect(recTLX3, recTLY3, cropWidth3, cropHeight3);
  }

  box3canvas.addEventListener("touchmove", updateRec);

  box3canvas.ontouchend = function (event) {
    box3canvas.removeEventListener("touchmove", updateRec);
  };
};

/////////

var phase3Btn = document.getElementById("gotoPhase3");
phase3Btn.onclick = function () {
  var div_phase2 = document.getElementById("phase2");
  div_phase2.style.display = "none";
  var div_phase3 = document.getElementById("phase3");
  div_phase3.style.display = "block";

  var domdraw = document.getElementById("dom-draw");
  var ddctx = domdraw.getContext("2d");
  ddctx.strokeStyle = "red";
  ddctx.strokeRect(recTLX1, recTLY1, cropWidth1, cropHeight1);
  ddctx.strokeStyle = "green";
  ddctx.strokeRect(recTLX2, recTLY2, cropWidth2, cropHeight2);
  ddctx.strokeStyle = "blue";
  ddctx.strokeRect(recTLX3, recTLY3, cropWidth3, cropHeight3);

  var box1name = dom1[0].children[0].value;
  var box2name = dom2[0].children[0].value;
  var box3name = dom3[0].children[0].value;
  var resbox1 = document.getElementById("res-box1").children;
  var resbox2 = document.getElementById("res-box2").children;
  var resbox3 = document.getElementById("res-box3").children;
  resbox1[0].innerText = box1name;
  resbox2[0].innerText = box2name;
  resbox3[0].innerText = box3name;
};

var phase2Btn = document.getElementById("back-button");
phase2Btn.onclick = function () {
  var div_phase2 = document.getElementById("phase2");
  div_phase2.style.display = "block";
  var div_phase3 = document.getElementById("phase3");
  div_phase3.style.display = "none";

  var domdraw = document.getElementById("dom-draw");
  var ddctx = domdraw.getContext("2d");
  ddctx.clearRect(0, 0, domdraw.width, domdraw.height);

  var box1name = dom1[0].children[0].value;
  var box2name = dom2[0].children[0].value;
  var box3name = dom3[0].children[0].value;
  var resbox1 = document.getElementById("res-box1").children;
  var resbox2 = document.getElementById("res-box2").children;
  var resbox3 = document.getElementById("res-box3").children;
  resbox1[0].innerText = box1name;
  resbox2[0].innerText = box2name;
  resbox3[0].innerText = box3name;
};
