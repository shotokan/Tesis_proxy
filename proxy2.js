var http = require('http'),
    httpProxy = require('./http-proxy'),
    guardar = require('./guardarfs'),
    normalizar = require('./normalizacion'),
    docs = require('./documentos');
var contador = 0;
    
//
// Create your proxy server and set the target in the options.
//
var proxy = httpProxy.createProxyServer();

//
// Create your server that make an operation that take a while
// and then proxy de request
//
http.createServer(function (req, res) {
  // No se almacenan peticiones para archivos
    // No se almacenan peticiones para archivos con las extenciones de la variable cadena
  console.log("Llamada a server");
  if(!guardar.verifica(req.url)){
  		if (req.method == 'POST') {
         var parametros = "";
         var body = "";
         req.on('data', function (chunk) {
           body += chunk;
           //parametros += " \n" + body;
           });
           req.on('end', function () {
           guardar.guardarPeticionPost(req, contador, body);
           // use post['blah'], etc.
         });
         
      }else{
         guardar.guardarPeticion(req, contador);
      }
      contador = contador + 1;
   }else{
     console.log(req.url);
     console.log("No se ha podido guardar...");
  }

    //docs.conectarMongo();
  //console.log(req.headers['host']);
  
   proxy.web(req, res, { target: "http://www.google.com.mx" });
}).listen(8000);

//
// Create your target server
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(5060);