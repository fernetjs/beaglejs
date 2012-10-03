
var express = require('express')
  ,http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
});


function getHTML(options){
  var options = options || {};
  
  var html = " \
    <html> \
      <head>";

  if (options.og){
    html += " \
      <meta property='og:title' content='OG-Title'> \
      <meta property='og:image' content='OG-Image'> \
      <meta property='og:description' content='OG-Description'> \
      ";
  }

  if (options.meta){
    html += " \
      <meta name='title' content='META-Title'> \
      <link rel='image_src' href='META-Image'> \
      <meta name='description' content='META-Description'> \
      ";
  }

  html += " \
      <title>DOM-Title</title> \
    </head> \
    <body> \
      <h1>Awesome Site Test!</h1> \
      <p>DOM-Description</p> \
      <img src='DOM-Image0'> \
      <img src='DOM-Image1'> \
      <img src='DOM-Image2'> \
    </body> \
   </html>";

  return html;
}


app.get('/', function(req, res){
  res.send(getHTML({og:true, meta:true}));
});

app.get('/opengraph', function(req, res){
  res.send(getHTML({og: true}));
});

app.get('/metadata', function(req, res){
  res.send(getHTML({meta: true}));
});

app.get('/dom', function(req, res){
  res.send(getHTML());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Test server listening on port " + app.get('port'));
});