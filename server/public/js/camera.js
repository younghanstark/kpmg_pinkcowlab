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


  const getFrame = () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const data = canvas.toDataURL('image/png');
    return data;
}
const WS_URL_SEND = location.origin.replace(/^http/, 'ws');
const FPS = 3;
const ws_send = new WebSocket(WS_URL_SEND);
ws_send.onopen = () => {
    console.log(`Connected to ${WS_URL_SEND}`);
    setInterval(() => {
        ws_send.send(getFrame());
    }, 1000 / FPS);
}

const img = document.querySelector('img');
        
        const WS_URL_CLIENT = location.origin.replace(/^http/, 'ws');
        const ws_client = new WebSocket(WS_URL_CLIENT);
        ws_client.onopen = () => console.log(`Connected to ${WS_URL_CLIENT}`);
        ws_client.onmessage = message => {
            // set the base64 string to the src tag of the image
            img.src = message.data;
        }