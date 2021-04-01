// import "@babel/polyfill";
// when setting `useBuiltIns:'usage'`, polyfill are
// automatically imported when needed
import header from "./header";
import avatar from "../img/avatar.jpg";
import "../css/reset.css";
import "../css/index.scss";
import "../css/iconfont.css";
import counterInit from "./counter2";
import es6_test_fn from "./es6-test";
// import _ from "lodash";

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

var counter = document.getElementById("counter");
counter.onclick = function () {
    counter.innerText = parseInt(counter.innerText) + 1;
};
app.appendChild(counter);

header();
counterInit();
es6_test_fn().then((res) => {
    console.log(res);
});

// 通过import的方式引入lodash
/* var lodash_res = _.join(["a", "b", "c"], "***");
console.log(lodash_res); */

// 动态引入lodash
function getLodash() {
    return import(/* webpackChunkName:'lodash' */ "lodash").then(({ default: _ }) => {
        var element = document.createElement("div");
        element.innerHTML = _.join(["lodash", "loaded"], "-");
        return element;
    });
}
getLodash().then((element) => {
    document.body.appendChild(element);
});

// jquery
function getJQuery() {
    return import(/* webpackChunkName:'jquery' */ "jquery").then(({ default: $ }) => {
        var txtNode = document.createElement("p");
        txtNode.innerText = "jquery loaded";
        document.body.appendChild(txtNode);
    });
}
getJQuery();

if (module.hot) {
    module.hot.accept("./counter2", () => {
        counterInit();
    });
}
