var netherworld = {
    hasRipplez: function () {
        return document.getElementById("tinyhippos-injected");
    },

    goto: function (uri) {
        //TODO: Test if window.chrome exists on chromium
        if (window.chrome && netherworld.hasRipplez()) {
            //TODO: ensure that enableripple=cordova
            
            if (!uri.match("enableripple")) {
                uri += uri.match(/\?/) ? "&enableripple=cordova" : "?enableripple=cordova";
            }

            if (!uri.match("^http")) {
                uri = "http://" + uri;
            }
            console.log(uri);

            //window.location.href = uri;
        }
    },

    show: function (id) {
        document.getElementById(id).setAttribute("style", "");
    },

    hide: function (id) {
        document.getElementById(id).setAttribute("style", "display: none");
    }

};

window.addEventListener("load", function () {
    if (!window.chrome) {
        console.log("asdf");
        netherworld.show("browser-warning");
    }
    else if (!netherworld.hasRipplez()) {
        console.log("ffda");
        netherworld.show("ripple-warning");
    }
    else {
        netherworld.show("navigate");

        if (window.location.search) {
            var uri = decodeURI(window.location.search.split("=")[1]);
            netherworld.goto(uri);
        }
    }

    document.getElementById("go").addEventListener("click", function () {
        var address = document.getElementById("address");
        netherworld.goto(address.value);
    });
});
