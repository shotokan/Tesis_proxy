var http = require('http'),
    httpProxy = require('./http-proxy'),
    guardar = require('./guardarfs'),
    normalizar = require('./normalizacion'),
    docs = require('./documentos');
var fs = require('fs');
var contador = 1;
var f = new Date();
var fecha = f.getDate() + (f.getMonth() + 1) +  f.getFullYear()+"-"+f.getHours()+f.getMinutes()+f.getSeconds()+f.getMilliseconds();
path='./HTTPSQLi/'+fecha;
//path='./HTTPNormal/'+fecha;
fs.mkdirSync(path);
//
// Create your proxy server and set the target in the options.


//
// Create your server that make an operation that take a while
// and then proxy de request
//
var server = http.createServer(function (request, response) {
  // No se almacenan peticiones para archivos
    // No se almacenan peticiones para archivos con las extenciones de la variable cadena
  console.log("Llamada a server");
  if(!guardar.verifica(request.url)){
  		if (request.method == 'POST') {
         var parametros = "";
         var body = "";
         request.on('data', function (chunk) {
           body += chunk;
           //parametros += " \n" + body;
           });
           request.on('end', function () {
           guardar.guardarPeticionPost(request, contador, body, path);
           // use post['blah'], etc.
         });
         
      }else{
         guardar.guardarPeticion(request, contador, path);
      }
      contador = contador + 1;
   }else{
     console.log(request.url);
     console.log("No se ha podido guardar...");
  }

    //docs.conectarMongo();


//Envia la petición al host
var options = {
  host: '192.168.253.132',//request.headers['host'],
  method: request.method,
  headers: request.headers,
  path: request.url
};
//console.log(options);
var proxy = http.request(options, function(res) {
  // get the proxyclient response and write to the original response
    res.addListener('data', function(chunk){
      console.log("writing response");
      response.write(chunk, 'binary');
    });

    res.addListener('end', function(){
      console.log("end response");
      response.end();
    });
    response.writeHead(res.statusCode, res.headers);
});

 // intercept the request and write to proxyclient
  request.addListener('data', function(chunk){
    console.log("new request");
    proxy.write(chunk, 'binary');

  });

  request.addListener('end', function(){
    console.log("end request");
    proxy.end();
  });

}).listen(8000);

//
// Create your target server
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(5060);