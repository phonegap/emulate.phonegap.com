describe('app', function() {
    describe('hasRipplez', function() {
        it('should be true when Ripple is installed', function() {
            helper.id('stage').innerHTML = '<script id="tinyhippos-injected"></script>';
            expect(app.hasRipplez()).toBe(true);
        });

        it('should be false when Ripple is missing', function() {
            helper.remove('tinyhippos-injected');
            expect(app.hasRipplez()).toBe(false);
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
});
