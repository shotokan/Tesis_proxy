var fs = require('fs');
var norm = require('./normalizacion');


//Funcion que guarda las cabeceras de la peticion http en un archivo txt
function guardarPeticion(request, contador, path){
  var f = new Date();
  var fecha = f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear()+"-"+f.getHours()+f.getMinutes()+f.getSeconds()+f.getMilliseconds();
  var nomb = "./"+path + "/archivoSqli-" + contador + "-" + fecha + ".txt";
  //var nomb = "./"+path +"/normal-" + contador + "-" + fecha + ".txt";

  var cabeceras = request.method + " " + request.url;
  //var body = "\n";
  for(var h in request.headers){
    cabeceras += " " + h + ": " + request.headers[h];
  }
  fs.writeFile(nomb, cabeceras, 'utf8',function(error) {
    console.log("Cabeceras: Se ha escrito correctamente");
   // generarDocNormal(cabeceras + " ");
  generarDocSQLi(cabeceras + " ");
  });
   //console.log(norm.get_tokens(cabeceras));
}

//Funcion que guarda las cabeceras y argumentos post de la peticion http en un archivo txt
function guardarPeticionPost(request, contador, post, path){
   var f = new Date();
   var fecha = f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear()+"-"+f.getHours()+f.getMinutes()+f.getSeconds()+f.getMilliseconds();
   //var nomb = "./"+path +"/normal-" + contador + "-" + fecha + ".txt";
   var nomb = "./"+path + "/archivoSqli-" + contador + "-" + fecha + ".txt";
   var cabeceras = request.method + " " + request.url;
   //var body = "\n";
   for(var h in request.headers){
    cabeceras += " " + h + ": " + request.headers[h];
   }
   cabeceras += " " + post;
   fs.writeFile(nomb, cabeceras, 'utf8',function(error) {
     console.log("Cabeceras: Se ha escrito correctamente");
     //generarDocNormal(cabeceras + " ");
   //generarDocNormal(cabeceras + " ");
   generarDocSQLi(cabeceras + " ");
   });
   //console.log(norm.get_tokens(cabeceras));
}

//Funcion que guarda las cabeceras de la peticion http en un archivo txt
/*function guardarPeticion(request, contador){
	var nomb = "./archivo" + contador + ".txt";
   var cabeceras = request.method + " " + request.url;
	var body = "\n";
   for(var h in request.headers){
      cabeceras += " \n" + h + ": " + request.headers[h];
   }
   fs.writeFile(nomb, cabeceras, function(error) {
     console.log("Cabeceras: Se ha escrito correctamente");
    });
    //console.log(norm.get_tokens(cabeceras));
}
*/

//Se agrega al documento SQLi las nuevas cabeceras convertidas a minusculas.
function generarDocSQLi(cabeceras){
   fs.appendFile('./Sqli/Sqli.txt', cabeceras.toLowerCase(), 'utf8', function (err) {
     if (err) throw err;
     console.log('Los datos se han agregado al documento SQLi.txt!');
     //docs.leerDocumento("SQLi");
   });
}

//Se agrega al documento Normal las nuevas cabeceras convertidas a minusculas.
function generarDocNormal(cabeceras){
   fs.appendFile('./Normal/Normal.txt', cabeceras.toLowerCase(), 'utf8', function (err) {
     if (err) throw err;
     console.log('Los datos se han agregado al documento Normal.txt!');
   });
}


//Funcion que recibe una URL y verifica si es una petición para obtener algún archivo
//con las extenciones que se encuentran en la variable cadena
//retorna verdadero o falso
function verifica(url){
	var cadena = /(\.{1}(png|jpeg|jpg|gif|bmp|ico|js|cur|css|mp3|mp4|pdf|docx|json|xml|swf|xls|txt))$/;
	var re = new RegExp(cadena);
	if(re.test(url)){
    console.log("No se ha podido guardar...");
		return true;
  }else{
  	console.log(url);
    console.log("ya se ha guardado " + url);
    return false;

  }
  	return false;
}

//Se exportan los modulos que podrán ser accedidos desde fuera
exports.guardarPeticion = guardarPeticion;
exports.guardarPeticionPost = guardarPeticionPost;
exports.verifica = verifica;
