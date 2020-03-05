var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var express = require('express'), 
    fs = require('fs');

var app = express();

// Configuration
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

var port = process.env.PORT || 3000;
const server = app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});

module.exports = server
