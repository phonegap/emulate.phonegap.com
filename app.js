var express = require('express'), 
    fs = require('fs');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

app.get('/:id/*?', function (req, res) {
    var path = __dirname + "/dump" + req.originalUrl.split("?")[0];
    //HACK: we need to handle files that are not html
    var data = fs.readFileSync(path, 'utf8');
    data += "<script src='/js/detect.js'></script>";
    res.send(data);
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
