var guardar = require('./guardarfs'),
    normalizar = require('./normalizacion'),
    natural = require('natural'),
    docs = require('./documentos');
var MongoClient = require('mongodb').MongoClient;
var NGrams = natural.NGrams;
var sqli;
var cantidadSqli;
var cantidadNormal;
var normal;
var db;
function terminos(){
	var d = new Date();
	var inicioT = d.getHours() + " " +d.getMinutes() + " " + d.getSeconds() + " " + d.getMilliseconds();
	//var normal = trigramasNormal();
	/* -------------- Obtener datos SQLI -------------------- */
	var archivoSqli = docs.leerDocumento("Sqli");
	
	archivoSqli = decodeURIComponent(archivoSqli);
	
	var tokens = normalizar.tokens(archivoSqli);
	var triTokens = NGrams.trigrams(tokens);
	//console.log(triTokens.length);
	sqli = trigramasSqli(triTokens);
	console.log('Cantidad de trigramas diferentes en sqli: ' + sqli.length);
	cantidadSqli = triTokens.length;
	console.log('Cantidad total trigramas en doc sqli: ' + triTokens.length);
	/*------------------------ FIN SQLI -----------------*/

	/* -------------- Obtener datos NORMAL -------------------- */
	var archivoNormal = docs.leerDocumento("Normal");
	
	archivoNormal = decodeURIComponent(archivoNormal);
	
	var tokensN = normalizar.tokens(archivoNormal);
	var triTokensN = NGrams.trigrams(tokensN);
	
	cantidadNormal = triTokensN.length;
	normal = trigramasNormal(triTokensN);
	console.log('Cantidad diferentes Normal: ' + normal.length);
	console.log('Cantidad total trigramas en doc normal: ' + triTokensN.length);
	/*------------------------ FIN Normal -----------------*/

	//console.dir(sqli);
	//console.log(sqli[0][0]);
	//console.log(sqli);
	//console.log(normal);
	/*------------- Se insertan los documentos SQLI a mongodb --------------*/
	
	var document = {};
	/*var pop = sqli.pop();
	console.dir(sqli.pop());
	var tf = 0;
	var idf = 0;
	var tf_idf = 0;
	var norma = 0;
	tf = TF(pop[1], cantidadSqli);
		if(myIndexOf(pop[0], normal) !== -1){
			idf = IDF(2, 2);
		}else{
			idf = IDF(2, 1);
		}
		tf_idf = TF_IDF(tf, idf);*/
		//document = getDocumento('Normal');
		//insertar('Normal', document);
	/*for(s in sqli){
		//console.log(s);
		var tf = 0;
		var idf = 0;
		var tf_idf = 0;
		var norma = 0;
		tf = TF(sqli[s][1], cantidadSqli);
		if(myIndexOf(sqli[s][0], normal) !== -1){
			idf = IDF(2, 2);
		}else{
			idf = IDF(2, 1);
		}
		tf_idf = TF_IDF(tf, idf);
		//console.log(tf_idf);
		document = {termino: sqli[s][0], cantidad: sqli[s][1], tf: tf, idf: idf, tf_idf: tf_idf, norma: norma};
		insertar('SQLi', document);
	}
	archivoSqli = null;
	tokens = null;*/
/*------------- fin documentos SQLI a mongodb --------------*/

/*------------- Se insertan los documentos normal a mongodb --------------*/
/*
	var document = {};
for(s in normal){
		var tf = 0;
		var idf = 0;
		var tf_idf = 0;
		var norma = 0;
		tf = TF(normal[s][1], cantidadNormal);
		if(myIndexOf(normal[s][0], sqli) !== -1){
			idf = IDF(2, 2);
		}else{
			idf = IDF(2, 1);
		}
		tf_idf = TF_IDF(tf, idf);
		//console.log(tf_idf);
		document = {termino: normal[s][0], cantidad: normal[s][1], tf: tf, idf: idf, tf_idf: tf_idf, norma: norma};
		insertar('Normal', document);
	}
	*/
/*------------- fin documentos normal a mongodb --------------*/

var f = new Date();
var finT = f.getHours() + " " +f.getMinutes() + " " + f.getSeconds() + " " + f.getMilliseconds();

console.log("Inicio: " + inicioT);
console.log("Final: " + finT);
}


function getDocumento(tipo){
	var document = {};
	if(tipo === 'SQLi'){
		
		if(sqli.length > 0){
			console.log("SQLI: " + sqli.length);
			var pop = sqli.pop();
			console.dir(pop);
			//console.dir(sqli.pop());
			var tf = 0;
			var idf = 0;
			var tf_idf = 0;
			var norma = 0;
			tf = TF(pop[1], cantidadSqli);
				if(myIndexOf(pop[0], normal) !== -1){
					idf = IDF(2, 2);
				}else{
					idf = IDF(2, 1);
				}
				tf_idf = TF_IDF(tf, idf);
				return document = {termino: pop[0], cantidad: pop[1], tf: tf, idf: idf, tf_idf: tf_idf, norma: norma};
		}else{
			console.log("ELSE return null");
			return document=null;
		}
	}else{
		if(normal.length > 0){
			console.log("Normal: " + normal.length);
			var pop = normal.pop();
			console.dir(pop);
			//console.dir(sqli.pop());
			var tf = 0;
			var idf = 0;
			var tf_idf = 0;
			var norma = 0;
			tf = TF(pop[1], cantidadNormal);
				if(myIndexOf(pop[0], sqli) !== -1){
					idf = IDF(2, 2);
				}else{
					idf = IDF(2, 1);
				}
				tf_idf = TF_IDF(tf, idf);
				return document = {termino: pop[0], cantidad: pop[1], tf: tf, idf: idf, tf_idf: tf_idf, norma: norma};
		}else{
			return document=null;
		}
	}
	return document=null;
}

/*
* Se inserta el nuevo término
* id, termino, Cantidad, peso tf, peso IDF, valor TF-IDF, Norma 
*/
function insertar(tipo, dato){
	//var document = {termino: term, cantidad: 1, tf: 0, idf: 0, tf_idf: 0, norma: 0};

	MongoClient.connect('mongodb://127.0.0.1:27017/demoTesis2', function(err, database){
		if(err){ 
			console.log(err);
			throw err;
			
		}else{
			db = database;
			if(tipo === "SQLi"){
				insertar2(dato);
			}else if(tipo === 'Normal'){
				insertar2(dato);
			}else{
				console.log('El tipo de dato es incorrecto...');
			}
		}
	});

}

function insertar2(doc){
	console.log('insertar2');
	db.collection("terminos_normal").insert(doc, {w: 1}, function(err, records){
					if(err){ 
						console.log("ERROR: " + err);
						}
			  		console.log("Record added as Normal "+records[0]._id);
			  		//db.close();
			  		var doc = getDocumento('Normal');
			  		if(doc!==null) {
			  			console.log('en if!=null');
			  			insertar2(doc);
			  			return true;
			  		}
				});
}

function trigramasNormal(triTokens){

	//var archivo = docs.leerDocumento("Normal");
	//archivo = decodeURIComponent(archivo);
	var trigramas=[];
	//var tokens = normalizar.tokens(archivo);
	//var triTokens = NGrams.trigrams(tokens);
	var pos = 0;
	var contador = 0;
	var band = 0;
	var pesosNormal = [];
	for(t in triTokens){
		//console.log(trigramas.length);
		//console.log("Trigramas: " + trigramas);
		//console.log(t);
		//se verifica si existe un trigrama en la coleccion de trigramas
		//si no existe se agrega si existe es por que ya se ha contabilizado y no entra al while
		//console.log(t);
		if(t===1000){
			break;
		}
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
	//trigramas = null;
	return pesosNormal;
}

function trigramasSqli(triTokens){
	
	//var archivo = docs.leerDocumento("Normal");
	var trigramas=[];
	var pos = 0;
	var contador = 0;
	var pesosSqli = [];
	var band = 0;
	//console.log(trigramas[0][0]);
	cont = 0;
	//por cada trigrama se verificar cuantos iguales existen
	for(t in triTokens){
		t = parseInt(t);
		//console.log(trigramas.length);
		//console.log("Trigramas: " + trigramas);
		//console.log(t);
		//se verifica si existe un trigrama en la coleccion de trigramas
		//si no existe se agrega si existe es por que ya se ha contabilizado y no entra al while
		//console.log(t);
		//console.log(typeof t);
		/*if(t===200){
			break;
		}*/
		band = myIndexOf(triTokens[t], trigramas, band);
		//if(band===-1){ cont = cont + 1;}
		//console.log('band '+band);
		if(band === -1 ){
			//pos = parseInt(t);
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
	console.log("Trigramas: " + trigramas.length);
	//console.log("cont: " + cont);
	trigramas = null;
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

function IDF(numDocColeccion, aparicionDocumentos){
	//idf = Math.log(documentos);
	var resultado = numDocColeccion/aparicionDocumentos;
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