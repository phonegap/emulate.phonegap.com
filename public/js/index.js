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
        this.load();
        this.showLoading(false);
    },
    load: function() {
        if (this.hasWarnings()) {
            this.loadWarnings();
        }
        else if (this.hasApiRequest()) {
            this.loadApiRequest();
        }
        else {
            this.loadPageRequest();
        }
    },
    hasDependencies: function() {
        return this.isBrowserSupported() && this.hasRipplez();
    },
    hasWarnings: function() {
        return !this.hasDependencies();
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
    hasApiRequest: function() {
        return !!this.queryString().match(/url=/);
    },
    loadApiRequest: function() {
        var url = this.queryString().match(/url=([^&]*)/)[1];
        url = decodeURIComponent(url);

        var platform = this.queryString().match(/(platform=[^&]*)/);
        if (platform) {
            platform = platform[1].replace('platform=', 'enableripple=');

            var delimiters = url.match(/[\?\&]+/g);
            var delimiter = (delimiters) ? '&' : '?';
            url = url + delimiter + platform;
        }

        this.goto(url);
    },
    loadPageRequest: function() {
        this.show('content');
    },
    queryString: function() {
        return window.location.search;
    },
    loadApp: function() {
        if (!this.hasDependencies()) {
            return false;
        }

        if (window.location.search) {
            var uri = decodeURI(window.location.search.split("=")[1]);
            this.goto(uri);
        }
        else {
            this.show("search");
        }

        return true;
    },
    goto: function (uri) {
        if (!uri.match(/enableripple=/)) {
            uri += uri.match(/\?/) ? "&" : "?";
            uri += 'enableripple=cordova';
        }

        if (!uri.match(/^http[s]?:\/\//)) {
            uri = "http://" + uri;
        }

        this.redirect(uri);
    },
    redirect: function(uri) {
        //window.location.href = uri;
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
    loadWarnings: function() {
        if (!this.isBrowserSupported()) {
            this.show('browser-warning');
        }
        else if (!this.hasRipplez()) {
            this.show('ripple-warning');
        }
    }
};
