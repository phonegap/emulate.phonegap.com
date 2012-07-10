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
});
