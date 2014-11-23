var guardar = require('./guardarfs'),
    normalizar = require('./normalizacion'),
    natural = require('natural'),
    docs = require('./documentos');
var MongoClient = require('mongodb').MongoClient;
var NGrams = natural.NGrams;

function terminos(){
	
	//var normal = trigramasNormal();
	var sqli = trigramasSqli();
	console.log(pesosSqli);

}

function trigramasNormal(){
	var archivo = docs.leerDocumento("Normal");
	//var archivo = docs.leerDocumento("Normal");
	archivo = decodeURIComponent(archivo);
	var trigramas=[];
	var tokens = normalizar.tokens(archivo);
	var triTokens = NGrams.trigrams(tokens);
	var pos = 0;
	var contador = 0;
	var pesosNormal = [];
	for(t in triTokens){
		//console.log(trigramas.length);
		//console.log("Trigramas: " + trigramas);
		console.log(t);
		//se verifica si existe un trigrama en la coleccion de trigramas
		//si no existe se agrega si existe es por que ya se ha contabilizado y no entra al while
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
			pesosNormal.push([triTokens[t], contador]);
			//pesos[cont2] = [arrays[c], contador];
			//cont2 = cont2 + 1;
			contador = 0;
			pos = 0;

		}
		band = 0;
		
	}
	return pesosNormal;
}

function trigramasSqli(){
	var archivo = docs.leerDocumento("Sqli");
	//var archivo = docs.leerDocumento("Normal");
	archivo = decodeURIComponent(archivo);
	var trigramas=[];
	var tokens = normalizar.tokens(archivo);
	var triTokens = NGrams.trigrams(tokens);
	var pos = 0;
	var contador = 0;
	var pesosSqli = [];
	var band = 0;
	//console.log(trigramas[0][0]);
	//
	//por cada trigrama se verificar cuantos iguales existen
	for(t in triTokens){
		//console.log(trigramas.length);
		//console.log("Trigramas: " + trigramas);
		console.log(t);
		//se verifica si existe un trigrama en la coleccion de trigramas
		//si no existe se agrega si existe es por que ya se ha contabilizado y no entra al while
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
			pesosSqli.push([triTokens[t], contador]);
			//pesos[cont2] = [arrays[c], contador];
			//cont2 = cont2 + 1;
			contador = 0;
			pos = 0;

		}
		band = 0;
		
	}
	return pesosSqli;
}

//buscar un trigrama en arreglo
function myIndexOf(tokens, trigramas){
	//console.log("SIn pos");
	var cont = 0;
	var band = false;
	if(trigramas.length > 0 ){
		while(cont<trigramas.length){
			if(tokens[0]===trigramas[cont][0] && tokens[1]===trigramas[cont][1] && tokens[2] === trigramas[cont][2]){
				//si encuentra  los trigramas son iguales devuelve el indice de la posición
				return cont;
			}
			cont = cont + 1;
		}
	}

	return -1;
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

function TF(terminoCant, cantidadDoc){

		var tf = terminoCant/cantidadDoc;
		return tf;	
}

function IDF(numDocCpleccion, aparicionDocumentos){
	//idf = Math.log(documentos);
	var resultado = numDocCpleccion/aparicionDocumentos;
	var idf = log2(2, resultado);
	return idf;
}

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

terminos();