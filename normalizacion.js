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
*en tokens, haciendo uso de las funciones de la libreria natural Node
*Se devuelve un arreglo, con las cadenas convertidas a minúsculas
*y sin espacios.
*/
function tokens(doc){
	tokenizer = new natural.WordPunctTokenizer();
	var arrayTokens = tokenizer.tokenize(doc);
	for(var c in arrayTokens){
		arrayTokens[c] = trim(arrayTokens[c].toLowerCase());
	}
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
function decodificarURL(peticion){
	return decodeURIComponent(peticion);
}
exports.tokens = tokens;
exports.minusculas = minusculas;
exports.clearHeaders = clearHeaders;
exports.trim = trim;