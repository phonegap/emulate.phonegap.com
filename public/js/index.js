var app = {
    initialize: function() {
        this.bind();
        this.run();
    },
    bind: function() {
        document.getElementById("address").addEventListener("submit", function () {
            var address = document.getElementById("address");
            netherworld.goto(address.value);
        });
    },
    run: function() {
        this.showLoading(true);
        this.showWarnings();
        this.loadApp();
        this.showLoading(false);
    },
    hasDependencies: function() {
        return this.isBrowserSupported() && this.hasRipplez();
    },
    isBrowserSupported: function() {
        return !!window.chrome;
    },
    hasRipplez: function () {
        // we do not use window.chrome.isInstalled(id)
        // because Ripple has two IDs (hosted and Chrome Store)
        // and local dev installations have unique IDs.
        return !!document.getElementById("tinyhippos-injected");
    },
    loadApp: function() {
        if (!this.hasDependencies()) {
            return;
        }

        if (window.location.search) {
            var uri = decodeURI(window.location.search.split("=")[1]);
            this.goto(uri);
        }
        else {
            this.show("search");
        }
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
    },
    visible: function(id) {
        return (document.getElementById(id).style.display === '');
    },
    showLoading: function(loading) {
        if (loading) {
           this.show('loading');
        }
        else {
            this.hide('loading');
        }
    },
    showWarnings: function() {
        if (!this.isBrowserSupported()) {
            this.show('browser-warning');
        }
        else if (!this.hasRipplez()) {
            this.show('ripple-warning');
        }
    }
};
