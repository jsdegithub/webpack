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
