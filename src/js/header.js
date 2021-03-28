export default function () {
    var div = document.getElementById("app");
    var h2 = document.createElement("h2");
    h2.innerText = "这是h2标签";
    div.appendChild(h2);
}
