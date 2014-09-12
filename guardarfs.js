var fs = require('fs');
var norm = require('./normalizacion');

//Funcion que guarda las cabeceras de la peticion http en un archivo txt
function guardarPeticion(request, contador){
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

//Funcion que genera el documento SQLi
function generaDocumentoSqli(){

}

//Funcion que genera el documento normal
function generaDocumentoNormal(){

}

//Funcion que recibe una URL y verifica si es una petición para obtener algún archivo
//con las extenciones que se encuentran en la variable cadena
//retorna verdadero o falso
function verifica(url){
	var cadena = /(\.{1}(png|jpeg|jpg|gif|bmp|ico|js|cur|css|mp3|mp4|pdf|docx|json|xml|swf|xls|txt))$/;
	var re = new RegExp(cadena);
	if(re.test(url)){
		return true;
  	}else{
  		console.log(url);
  		console.log("No se ha podido guardar...");
  	}
  	return false;
}

exports.guardarPeticion = guardarPeticion;
exports.verifica = verifica;

//Funcion que elimina cabeceras comunes
function clearHeaders(){
	
}