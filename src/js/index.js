import header from "./header";
import avatar from "../img/avatar.jpg";
import "../css/reset.css";
import "../css/index.scss";
import "../css/iconfont.css";

/* var img = new Image();
img.src = avatar;
img.classList.add("avatar");
var app = document.getElementById("app");
app.appendChild(img); */

var app = document.getElementById("app");

var iconfontElement = document.createElement("div");
iconfontElement.innerHTML = "<div class='iconfont icon-UserService'></div>";
app.appendChild(iconfontElement);

var btn = document.getElementsByTagName("button")[0];
btn.onclick = function () {
    var txtElement = document.createElement("p");
    txtElement.innerHTML = "<h2>这是点击按钮生成的文本</h2>";
    app.appendChild(txtElement);
};

header();
