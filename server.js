//dependencies
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//port and server setup
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + 'views/partials');
app.set('view engine, hbs');

//Log setup
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = (`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log', log + '\n', err =>{
    if(err){
      console.log('Unable to append the log file.');
    }
  });
  next();
});

app.get('/',(req, res) => {
  res.render('home.hbs');
});

//static directory
app.use(express.static(__dirname + '/public'));


//socket activation
app.listen(port, () =>{
  console.log(`Now listening on ${port}`);
});
