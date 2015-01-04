var consulta, triConsulta, cantidadTrigramas;
var normalizar = require('./normalizacion'),
		natural = require('natural');
var MongoClient = require('mongodb').MongoClient;
var NGrams = natural.NGrams;
var db;
function clasificar(q){

	consulta =  decodeURIComponent(q);
	var tokens = normalizar.tokens(consulta);
	var triTokens = NGrams.trigrams(tokens);
	triConsulta = countTrigrams(triTokens);
	cantidadTrigramas = triTokens.length;
}

function myIndexOf(tokens, trigramas, pos){
	//console.log("con pos");
	var cont = pos;
	var band = false;
	if(trigramas.length > 0 ){
		while(cont<trigramas.length){
			if(tokens[0]===trigramas[cont][0] && tokens[1]===trigramas[cont][1] && tokens[2] === trigramas[cont][2]){
				return cont;
			}
			cont = cont + 1;
		}
	}

	return -1;
}

function countTrigrams(triTokens){

	//var archivo = docs.leerDocumento("Normal");
	//archivo = decodeURIComponent(archivo);
	var trigramas=[];
	//var tokens = normalizar.tokens(archivo);
	//var triTokens = NGrams.trigrams(tokens);
	var pos = 0;
	var contador = 0;
	var band = 0;
	var pesosTrigramas = [];
	for(t in triTokens){
		//console.log(trigramas.length);
		//console.log("Trigramas: " + trigramas);
		//console.log(t);
		//se verifica si existe un trigrama en la coleccion de trigramas
		//si no existe se agrega si existe es por que ya se ha contabilizado y no entra al while
		//console.log(t);
		band = myIndexOf(triTokens[t], trigramas, band);
		//console.log('band '+band);
		if(band === -1 ){
			pos = parseInt(t);
			trigramas.push(triTokens[t]);
			//console.log("Trigramas2: " + trigramas);
			//console.log("Primer tritokens");
			//verifica si se encontró algun trigrama

			while(pos != -1){
				//console.log("Segundo tritoken");
				//console.log('pos ' +pos);
				pos = myIndexOf(triTokens[t], triTokens, pos);
				//console.log("POS " + pos);
				if (pos != -1){
					//console.log("EN IF")
					contador = contador + 1;
					//console.log("Contador2 : " +contador);
					pos = pos +1;
				}
			}
			pesosTrigramas.push([triTokens[t], contador]);
			//pesos[cont2] = [arrays[c], contador];
			//cont2 = cont2 + 1;
			contador = 0;
			pos = 0;

		}
		band = 0;

	}
	//trigramas = null;
	return pesosTrigramas;
}

/* Recibir peticiones */

function peticionPost(request, body){
	var f = new Date();
   //var fecha = f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear()+"-"+f.getHours()+f.getMinutes()+f.getSeconds()+f.getMilliseconds();
   //var nomb = "./"+path +"/normal-" + contador + "-" + fecha + ".txt";
   //var nomb = "./"+path + "/archivoSqli-" + contador + "-" + fecha + ".txt";
   var cabeceras = request.method + " " + request.url;
   //var body = "\n";
   for(var h in request.headers){
    cabeceras += " " + h + ": " + request.headers[h];
   }
   cabeceras += " " + post;
   return cabeceras;
}

//Funcion que guarda las cabeceras de la peticion http en un archivo txt
function peticionGet(request){
	var f = new Date();
	//var fecha = f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear()+"-"+f.getHours()+f.getMinutes()+f.getSeconds()+f.getMilliseconds();
	//var nomb = "./"+path + "/archivoSqli-" + contador + "-" + fecha + ".txt";
	//var nomb = "./"+path +"/normal-" + contador + "-" + fecha + ".txt";

	var cabeceras = request.method + " " + request.url;
	//var body = "\n";
	for(var h in request.headers){
		cabeceras += " " + h + ": " + request.headers[h];
	}
	return cabeceras;
	//console.log(norm.get_tokens(cabeceras));
}

/* Obtener pesos */

function Norma(terminos){
	var suma=0;
	for(var t in terminos){
		suma = suma + Math.pow(terminos[t],2);
	}
	var raiz = Math.sqrt(suma);
	return raiz;
}

function log2(b, n) {
	return Math.log(n) / Math.log(b);
}

function TF_IDF(tf, idf){
	var tf_idf = tf * idf;
	return tf_idf;
}

//Se exportan los modulos que podrán ser accedidos desde fuera
exports.peticionGet = peticionGet;
exports.peticionPost = peticionPost;
