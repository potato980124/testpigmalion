let rHeader = document.querySelector(".header");
let rFooter = document.querySelector(".footer");
if (location.pathname == "/login" || location.pathname == "/join") {
    rHeader.style.display = "none";
    rFooter.style.display = "none";
}