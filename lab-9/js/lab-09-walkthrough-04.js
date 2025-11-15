/* code goes here */
function simpleHandler(event) {
    var content = document.getElementById("content");
    if (btn.innerHTML == "Hide") {
        btn.innerHTML = "Show";
        content.className = "makeItDisappear";
        setTimeout(function () {
            content.style.display = "none";
        }, 1000);
    } else {
        content.style.display = "block";
        setTimeout(function(){
            content.className = "makeItNormal";
        },500);
        btn.innerHTML = "Hide";
    }
}

var btn = document.getElementById("testButton");
btn.addEventListener("click", simpleHandler);

var img = document.getElementById("mainImage");
img.addEventListener("mouseover", function (event) {
    img.className = "makeItGray";
});

img.addEventListener("mouseout", function (event) {
    img.className = "makeItNormal";
});
