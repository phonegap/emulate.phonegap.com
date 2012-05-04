(function () {
    var installed = document.getElementById("tinyhippos-injected");
    if (!installed) {
        var outer = "background-color: rgba(0,0,0, 0.6);position: absolute; left: 0px; top: 0px; width:100%; height:100%; text-align:center; z-index: 1000;",
            inner = "width:300px; margin: 100px auto; background-color: #fff; border:1px solid #000; padding:15px; text-align:center;",
            overlay = document.createElement('div'),
            dialog = document.createElement('div');

        overlay.setAttribute("style", outer);
        dialog.setAttribute("style", inner);

        dialog.innerHTML = "omfg, you needz the ripplez! <br/>I guess we should tell them how to get it";

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
    }
})();
