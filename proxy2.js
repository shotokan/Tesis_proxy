var http = require('http'),
    httpProxy = require('./http-proxy'),
    guardar = require('./guardarfs'),
    normalizar = require('./token');
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
  		guardar.guardarPeticion(req, contador);
  		contador = contador + 1;
  		//console.log(typeof(req));
  		//console.log(normalizar.minusculas("HoLA Que OnDA"));
  		y = normalizar.tokens(req);
  		docs.pesos(y);
  		docs.listarPesos();
  	}else{
  		console.log(req.url);
  		console.log("No se ha podido guardar...");
  	}
  //console.log(req.headers['host']);
  
   proxy.web(req, res, { target: "http://www.itmerida.mx" });
}).listen(8000);

//
// Create your target server
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(5060);