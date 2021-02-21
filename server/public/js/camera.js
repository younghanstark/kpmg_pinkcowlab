var camSelection = document.getElementById("selectArea");
var video = document.getElementById("vid");
var deviceList = document.getElementById("devices");
var devices = [];
var stream;
// var selectedCamera = [];
var tests;
var r = 0;
var camNum = 0;
var scanning = false;
var height = 0;
var width = 0;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var mainCanvas = document.getElementById("area-canvas");
var ctx_area = mainCanvas.getContext("2d");
var resultCanvas = document.getElementById("result-canvas");
var ctx_result = resultCanvas.getContext("2d");

const agt = navigator.userAgent.toLowerCase();

console.log(agt);

function gotDevices(deviceInfos) {
  let camcount = 1;

  for (let i = 0; i !== deviceInfos.length; ++i) {
    let deviceInfo = deviceInfos[i];
    let option = document.createElement("option");
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === "videoinput") {
      option.text = deviceInfo.label || "camera " + camcount;
      devices.push(option);
      deviceList.add(option);
      camcount++;
    }
  }
  console.log(deviceList);
}

function errorCallback(error) {
  console.log("navigator.getUserMedia error: ", error);
}

navigator.mediaDevices
  .getUserMedia({ audio: false, video: true })
  .then((mediaStream) => {
    video.srcObject = mediaStream;
    console.log("in");
    navigator.mediaDevices
      .enumerateDevices()
      .then(gotDevices)
      .catch(errorCallback);
  })
  .catch((error) => {
    console.error("getUserMedia error!", error);
  });

if (document.location.hostname !== "localhost") {
  if (document.location.protocol !== "https:") {
    $(document).html("This doesn't work well on http. Redirecting to https");
    console.log("redirecting to https");
    document.location.href =
      "https:" +
      document.location.href.substring(document.location.protocol.length);
  }
}

var scanButton = document.getElementById("cam-scan");

document.addEventListener(
  "keydown",
  function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  },
  true
);

scanButton.onclick = () => {
  console.log("scan");
  var userName = document.getElementById("name").value;
  console.log("," + userName + ",");
  if (userName != "please enter name" || userName !== "") {
    if (userName == "") {
      console.log(typeof userName);
    }
    tests = quickScan;
    console.log(tests);
    scanning = true;

    var camera = {};

    if (devices) {
      for (let deviceCount = 0, d = 0; d < deviceList.length; d++) {
        if (deviceList[d].selected) {
          for (let z = 0; z < devices.length; z++) {
            if (devices[z].value === deviceList[d].value) {
              camera.id = devices[z].value;
              camera.label = devices[z].text;
              console.log(camera.label + "[" + camera.id + "] selected");
              break;
            }
          }
          break;
        }
      }
      console.log(camera);
      if (Object.keys(camera).length !== 0) {
        gum(tests[r], camera);
      }
    } else {
      selectedCamera[0] = { label: "Unknown" };
      console.log("3");
      gum(tests[r]);
    }
  }

  gotoPhase2();
};

function gum(candidate, device) {
  console.log("trying " + candidate.label + " on " + device.label);

  if (stream) {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  let constraints = {
    audio: false,
    video: {
      deviceId: device.id ? { exact: device.id } : undefined,
      width: { exact: candidate.width },
      height: { exact: candidate.height },
    },
  };

  setTimeout(
    () => {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(gotStream)

        .catch((error) => {
          console.log("getUserMedia error!", error);

          if (scanning) {
            captureResults("fail: " + error.name);
          }
        });
    },
    stream ? 200 : 0
  );

  function gotStream(mediaStream) {
    console.log(
      "Display size for " +
        candidate.label +
        ": " +
        candidate.width +
        "x" +
        candidate.height
    );
    height = candidate.height;
    width = candidate.width;

    canvas.width = width;
    canvas.height = height;
    mainCanvas.height = height;
    mainCanvas.width = width;
    resultCanvas.width = width;
    resultCanvas.height = height;
    canvas_ph2.width = width;
    canvas_ph2.height = height;
    box1canvas.width=width;
    box1canvas.height=height;
    box2canvas.width=width;
    box2canvas.height=height;
    box3canvas.width=width;
    box3canvas.height=height;
    var domdraw = document.getElementById("dom-draw");
    domdraw.width = width;
    domdraw.height = height;

    var divCanvas = document.getElementById("div-canvas");
    divCanvas.style.width = String(width);
    divCanvas.style.height = String(height) + "px";

    var divCanvas2 = document.getElementById("div-canvas-ph2");
    divCanvas2.style.width = String(width) + "px";
    divCanvas2.style.height = String(height) + "px";

    scanning = false;

    video.srcObject = mediaStream;
    video.onloadedmetadata = function (e) {
      video.play();
    };

    console.log("draw");
  }
}

function captureResults(status) {
  if (!scanning) return;

  r++;

  if (r < tests.length) {
    gum(tests[r], selectedCamera[camNum]);
  }
}

const quickScan = [
  {
    label: "360p(nHD)",
    width: 640,
    height: 360,
    ratio: "16:9",
  },
  {
    label: "CIF",
    width: 352,
    height: 288,
    ratio: "4:3",
  },
  {
    label: "QVGA",
    width: 320,
    height: 240,
    ratio: "4:3",
  },
  {
    label: "QCIF",
    width: 176,
    height: 144,
    ratio: "4:3",
  },
  {
    label: "QQVGA",
    width: 160,
    height: 120,
    ratio: "4:3",
  },
];
