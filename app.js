// *******************************************************
// expressjs template
//
// assumes: npm install express
// defaults to jade engine, install others as needed
//
// assumes these subfolders:
//   public/
//   public/javascripts/
//   public/stylesheets/
//   views/
//
var express = require('express');
var app = module.exports = express.createServer();
var viewEngine = 'jade'; // modify for your view engine
// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', viewEngine);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});
// *******************************************************
var plates = require('./plates');
app.get('/', function(req, res) {
    res.render('plates/index', {locals: {
        plates: plates.all
    }});
});

app.get('/plates/:id', function(req, res) {
  var plate = plates.find(req.params.id);
  res.render('plates/display_one', {locals: {
    plate: plate
  }});
});

app.listen(process.env.C9_PORT||4000);