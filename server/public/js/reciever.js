var imageR = document.querySelector("img");
var body = document.body;

//client

ws_client.on("src", (newS) => {
  //console.log(newS);
  // set the base64 string to the src tag of the image
  imageR.src = newS;
  //console.log(newS)
});
ws_client.on("warn", (warn) => {
  if (warn === undefined || warn == "False") {
    body.style.setProperty("--background-color", "red");
  } else {
    body.style.setProperty("--background-color", "green");
  }
});
