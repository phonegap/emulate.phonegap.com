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

    describe('loadApp', function() {
        it('should not load when missing dependencies', function() {
            spyOn(app, 'hasDependencies').andReturn(false);
            expect(app.loadApp()).toEqual(false);
        });
    });
});
