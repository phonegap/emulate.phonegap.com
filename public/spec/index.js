describe('app', function() {
    describe('hasRipplez', function() {
        it('should be true when Ripple is installed', function() {
            helper.id('stage').innerHTML = '<script id="tinyhippos-injected"></script>';
            expect(app.hasRipplez()).toBe(true);
        });

        it('should be false when Ripple is missing', function() {
            var el = helper.id('tinyhippos-injected');
            helper.remove('tinyhippos-injected');
            expect(app.hasRipplez()).toBe(false);
            if (el) document.body.appendChild(el);
        });
    });

    describe('isBrowserSupported', function() {
        var _chrome = window.chrome;

        afterEach(function() {
            window.chrome = _chrome;
        });

        it('should be true when using the Chrome browser', function() {
            window.chrome = {};
            expect(app.isBrowserSupported()).toBe(true);
        });

        it('should be false when not using the Chrome browser', function() {
            window.chrome = undefined;
            expect(app.isBrowserSupported()).toBe(false);
        });
    });

    describe('hasDependencies', function() {
        it('should be true when Chrome and Ripple exist', function() {
            spyOn(app, 'hasRipplez').andReturn(true);
            spyOn(app, 'isBrowserSupported').andReturn(true);
            expect(app.hasDependencies()).toBe(true);
        });

        it('should be false when Chrome and Ripple are missing', function() {
            spyOn(app, 'hasRipplez').andReturn(false);
            spyOn(app, 'isBrowserSupported').andReturn(false);
            expect(app.hasDependencies()).toBe(false);
        });

        it('should be false when Chrome is missing', function() {
            spyOn(app, 'hasRipplez').andReturn(true);
            spyOn(app, 'isBrowserSupported').andReturn(false);
            expect(app.hasDependencies()).toBe(false);
        });

        it('should be false when Ripple is missing', function() {
            spyOn(app, 'hasRipplez').andReturn(false);
            spyOn(app, 'isBrowserSupported').andReturn(true);
            expect(app.hasDependencies()).toBe(false);
        });
    });

    describe('hasWarnings', function() {
        it('should be false when there are no warnings', function() {
            spyOn(app, 'hasDependencies').andReturn(true);
            expect(app.hasWarnings()).toEqual(false);
        });

        it('should be true when there are warnings', function() {
            spyOn(app, 'hasDependencies').andReturn(false);
            expect(app.hasWarnings()).toEqual(true);
        });
    });

    describe('loadApp', function() {
        it('should not load when missing dependencies', function() {
            spyOn(app, 'hasDependencies').andReturn(false);
            expect(app.loadApp()).toEqual(false);
        });
    });

    describe('load', function() {
        it('should load a warning when a warning exists', function() {
            spyOn(app, 'hasWarnings').andReturn(true);
            spyOn(app, 'showWarnings');
            app.load();
            expect(app.showWarnings).toHaveBeenCalled();
        });

        it('should load API on API request', function() {
            spyOn(app, 'hasWarnings').andReturn(false);
            spyOn(app, 'hasApiRequest').andReturn(true);
            spyOn(app, 'loadApiRequest');
            app.load();
            expect(app.loadApiRequest).toHaveBeenCalled();
        });

        it('should load search page on page request', function() {
            spyOn(app, 'hasWarnings').andReturn(false);
            spyOn(app, 'hasApiRequest').andReturn(false);
            spyOn(app, 'loadPageRequest');
            app.load();
            expect(app.loadPageRequest).toHaveBeenCalled();
        });
    });

    describe('showLoading', function() {
        beforeEach(function() {
            spyOn(app, 'show');
            spyOn(app, 'hide');
        });

        it('should show loading state', function() {
            app.showLoading(true);
            expect(app.show).toHaveBeenCalledWith('loading');
            expect(app.hide).not.toHaveBeenCalled();
        });

        it('should not show loading state', function() {
            app.showLoading(false);
            expect(app.show).not.toHaveBeenCalled();
            expect(app.hide).toHaveBeenCalledWith('loading');
        });
    });

    describe('showWarnings', function() {
        it('should show no warnings when dependencies exist', function() {
            spyOn(app, 'hasRipplez').andReturn(true);
            spyOn(app, 'isBrowserSupported').andReturn(true);
            spyOn(app, 'show');
            app.showWarnings();
            expect(app.show).not.toHaveBeenCalled();
        });

        it('should show browser warning', function() {
            spyOn(app, 'hasRipplez').andReturn(true);
            spyOn(app, 'isBrowserSupported').andReturn(false);
            spyOn(app, 'show');
            app.showWarnings();
            expect(app.show).toHaveBeenCalledWith('browser-warning');
        });

        it('should show Ripple warning', function() {
            spyOn(app, 'hasRipplez').andReturn(false);
            spyOn(app, 'isBrowserSupported').andReturn(true);
            spyOn(app, 'show');
            app.showWarnings();
            expect(app.show).toHaveBeenCalledWith('ripple-warning');
        });
    });

    describe('hasApiRequest', function() {
        it('should be false when qs is empty', function() {
            spyOn(app, 'queryString').andReturn('');
            expect(app.hasApiRequest()).toBe(false);
        });

        it('should be false when the url qs is missing', function() {
            spyOn(app, 'queryString').andReturn('?platform=cordova&foo=bar');
            expect(app.hasApiRequest()).toBe(false);
        });

        it('should be true when the url qs exists', function() {
            spyOn(app, 'queryString').andReturn('?url=google.com');
            expect(app.hasApiRequest()).toBe(true);
        });
    });

    describe('loadApiRequest', function() {
        it('is pending...', function() {
            expect(false).toBe(true);
        });
    });

    describe('loadPageRequest', function() {
        it('is pending...', function() {
            expect(false).toBe(true);
        });
    });
});
