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
    },
    submit: function(id) {
        var e = document.createEvent('Event');
        e.initEvent('submit', true, true);
        this.id(id).dispatchEvent(e);
    },
    createPageRequestForm: function(id) {
        this.id(id).innerHTML = '<form id="page-request-form" onsubmit="return false;">' +
                                    '<input id="page-request-address" type="url" />' +
                                '</form>';
    }
};
