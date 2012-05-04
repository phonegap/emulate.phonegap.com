var express = require('express'), 
    fs = require('fs'),
    routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);

app.get('/ripple.crx', function (req, res) {
    res.send('ripple download!');
});

app.get('/:id/*?', function (req, res) {
    console.log(req.params.id);
    console.log(req.originalUrl);
    var data = fs.readFileSync(__dirname + '/dump' + req.originalUrl, 'utf8');
    data += "<script src='/js/detect.js'></script>";
    res.send(data);
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
