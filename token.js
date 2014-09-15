/*
*Autor: Iván Sabido
*Descripción: Funciones para el tratamiento de las cabeceras recibidas por
*el proxy.
*Fecha: 03/07/2014
*Lugar: Mérida, Yucatán, México
*Módulo para normalizar el texto
*/

var natural = require('natural');

/*
*Funcion tokens, recibe cabeceras y las divide
*en tokens, haciendo uso de las funciones de la libreria naturalNode
*Se devuelve un arreglo.
*/
function tokens(request){
	tokenizer = new natural.WordPunctTokenizer();
	var cabeceras = request.method + " " + request.url;
	var body = "\n";
   for(var h in request.headers){
      cabeceras += " " + h + ": " + request.headers[h];
   }
	var arrayTokens = tokenizer.tokenize(cabeceras.toString());
	console.log("Cabeceras HTTP-String: "+ arrayTokens);
	//console.log(tokenizer.tokenize("my dog hasn't any fleas."));
	return arrayTokens;
}
function tokens2(doc){
	tokenizer = new natural.WordPunctTokenizer();
	var arrayTokens = tokenizer.tokenize(doc);
	return arrayTokens;
}
/*
*Funcion minúsculas: recibe el texto de las cabeceras HTTP, lo transforma a minúsculas
*y lo retorna
*/
function minusculas(cabeceras){
	cabeceras = cabeceras.toString();
	return cabeceras.toLowerCase();	
}

/*
*/
function clearHeaders(arrayCabeceras){
	var pos=0;
	while(pos != -1){
		pos = arrayCabeceras.indexOf( 'c' );
		pos > -1 && arr.splice( pos, 1 );
	}
	return cabeceras;
}

/*
* Función para eliminar los espacios en blanco del array generado al realizar la tokenización
* del documento
*/
function trim(cadena){
	return cadena.replace(" ","");
}

exports.tokens = tokens;
exports.minusculas = minusculas;
exports.clearHeaders = clearHeaders;
exports.tokens2 = tokens2;
exports.trim = trim;