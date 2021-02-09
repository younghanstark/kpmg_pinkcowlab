var constraints = {
  audio: false,
  video: { width: 1280, height: 720 },
};

console.log(navigator);
console.log(navigator.mediaDevices);

//make mediaDevices to empty instance if necessary
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (
    contraints
  ) {
    //use legacy -> getUserMedia -> deprecated
    var getUserMedia =
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    //worst case
    if (!getUserMedia) {
      return Promise.reject(
        new Error(
          "getUserMedia is not implemented in this browser"
        )
      );
    }
    return new Promise(function (resolve, reject) {
      getUserMedia.call(
        navigator,
        constraints,
        resolve,
        reject
      );
    });
  };
}

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(function (mediaStream) {
    var video = document.querySelector("video");
    video.srcObject = mediaStream;
    //아래 코드 없으면 비디오 화면이 재생 안됨
    video.onloadedmetadata = function (e) {
      video.play();
    };
  })
  .catch(function (err) {
    console.log(err.name + ": " + err.message);
  });
