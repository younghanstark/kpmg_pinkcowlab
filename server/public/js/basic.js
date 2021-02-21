function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function processStr(str) {
    return str.replace(/(\s*)/g, "").toLowerCase();
}

var title = getParameterByName("content");

if (title != "") {
    var nav = document.getElementById("main-nav");
    var navList = nav.children;
    for (var i = 0; i < navList.length; i++) {
        if (processStr(navList[i].innerHTML) == title) {
            navList[i].classList.add("active");
            break;
        }
    }
}
