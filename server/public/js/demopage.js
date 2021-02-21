function gotoPhase2() {
  var cameraselect = document.getElementById("devices");
  var cur_option = cameraselect.options.selectedIndex;
  var cur_value = cameraselect.options[cur_option].value;
  var name_value = document.getElementById("name").value;

  if (cur_value == "notselected" || name_value == "please enter name") {
    console.log("nownownownow");
    var div_alert = document.getElementById("select-alert");
    div_alert.style.display = "block";
    div_alert.classList.remove("shake");
    div_alert.offsetWidth = div_alert.offsetWidth;
    div_alert.classList.add("shake");
  } else if (name_value == "") {
  } else {
    var div_phase1 = document.getElementById("phase1");
    div_phase1.style.display = "none";
    var div_phase2 = document.getElementById("phase2");
    div_phase2.style.display = "block";
  }
}
