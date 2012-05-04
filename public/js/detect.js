(function () {
    var installed = document.getElementById("tinyhippos-injected");
    console.log(installed);
    if (!installed) {
        var outer = "position: absolute; left: 0px; top: 0px; width:100%; height:100%; text-align:center; z-index: 1000;",
            inner = "width:300px; margin: 100px auto; background-color: #fff; border:1px solid #000; padding:15px; text-align:center;",
            overlay = document.createElement('div'),
            dialog = document.createElement('div');

        overlay.setAttribute("style", outer);
        dialog.setAttribute("style", inner);

        dialog.innerHTML = "omfg, you needz the ripplez!";

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
    }
})();
