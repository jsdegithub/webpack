import header from "./header";
import avatar from "../img/avatar.jpg";
import "../css/reset.css";
import "../css/index.scss";
import "../css/iconfont.css";

var img = new Image();
img.src = avatar;
img.classList.add("avatar");
var app = document.getElementById("app");
app.appendChild(img);

var iconfontElement = document.createElement("div");
iconfontElement.innerHTML = "<div class='iconfont icon-UserService'></div>";

app.appendChild(iconfontElement);

header();
