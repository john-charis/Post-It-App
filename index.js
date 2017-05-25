const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');

const port = process.env.port || 8000;

//set up express app
const app = express();

//body parser, to grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 


//to use the routes specified in api.js
app.use(routes);



//Listen for HTTP request


app.listen(port, function(){
  console.log('Now listening for request at ' + port)
});

 