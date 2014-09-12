var http = require('http');
var contador = 0;
var fs = require("fs");
var qs = require('querystring');
var sys = require ('sys');
var URI = require('url');
http.createServer(function(request, response) {
  var proxy = http.createClient(80, request.headers['host'])
  var proxy_request = proxy.request(request.method, request.url, request.headers);
  //console.log(request.headers);
  //console.log(request.method);
  //console.log(request.url);
  contador = contador + 1;
  // Expresion regular que representa un Email válido
  cadena = /(\.{1}(png|jpeg|jpg|gif|bmp|ico|js|css|mp3|mp4|pdf|docx|json|xml))$/;
  re = new RegExp(cadena);
  if(!re.test(request.url)){
    var nomb = "./archivo" + contador + ".txt";
    var cabeceras = request.method + " " + request.url;

    var body = "\n";


    for(var h in request.headers){
      cabeceras += " \n"+ h + ": " + request.headers[h];
    }
   
    fs.writeFile(nomb, cabeceras, function(error) {
     console.log("Cabeceras: Se ha escrito correctamente");
    });
 


  request.on('data', function (chunk) {
    body += chunk;
    cabeceras += " \n" + body;
  });
      request.on('end', function () {
        //console.log('POSTed: ' + body);
        cabeceras += " \n" + body;
        //console.log('HEADERS: ' + cabeceras);
        fs.appendFile(nomb, body, function (err) {
      	 if (err) throw err;
  	     //console.log('The "data to append" was appended to file!');
        });
      });
  }else{
    console.log("Peticion no se permite guardar...");
  }

  proxy_request.addListener('response', function (proxy_response) {
    proxy_response.addListener('data', function(chunk) {
      response.write(chunk, 'binary');
    });
    proxy_response.addListener('end', function() {
      response.end();
    });
    response.writeHead(proxy_response.statusCode, proxy_response.headers);
  });
  request.addListener('data', function(chunk) {
  	//console.log(chunk);
    proxy_request.write(chunk, 'binary');
  });
  request.addListener('end', function() {
    proxy_request.end();
  });
}).listen(9080);