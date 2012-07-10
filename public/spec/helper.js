beforeEach(function() {
    helper.id('stage').innerHTML = '';
});

var helper = {
    id: function(id) {
        return document.getElementById(id);
    },
    remove: function(id) {
        var el = this.id('tinyhippos-injected');
        el.parentElement.removeChild(el);
    }
};
