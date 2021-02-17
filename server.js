//imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
 
//instanciate server
var server = express();

//Body Parser configuration
server.use(bodyParser.urlencoded({extended : true}));
server.use(bodyParser.json());

//configurate routes
server.get('/', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour Chris</h1>');
});

server.use('/api/', apiRouter);

//launch server
server.listen(3000, function(){
    console.log('Server en ecoute : '); 
});
