var consulta, triConsulta, cantidadTrigramas;
var normalizar = require('./normalizacion'),
		natural = require('natural');
var MongoClient = require('mongodb').MongoClient;
var NGrams = natural.NGrams;
var db;
var cantidadTrigramas;
var sumIdf = 0;

function clasificar(q){
	//console.log(q);
	consulta =  decodeURIComponent(q);
	var tokens = normalizar.tokens(consulta);
	var triTokens = NGrams.trigrams(tokens);
	triConsulta = countTrigrams(triTokens);
	//cantidadTrigramas = triTokens.length;
	cantidadTrigramas = triConsulta.length;
	var term = [];
	for(t in triConsulta){
		term.push(triConsulta[t][0]);
	}
	//console.dir(term);
	sim(term, "terminos_normal", triConsulta,cantidadTrigramas, triTokens.length);
	//getDoc("terminos_normal");
	return triConsulta;
}

function generaPesos(terminos, cantidad, terminos2, cantidad2){
	var  document = {};
	var tf = 0;
	var idf = 0;
	var tf_idf = 0;
	var norma = 0;
	var arrayDocument = [];
	for(t in terminos){
		tf = TF(terminos[t][1], cantidad);
		//console.log("TF: " + tf);
		if(myIndexOf(terminos[t][0], terminos2) !== -1){
			idf = IDF(2/2);
			
			break;
		}else{
			idf = IDF(2/1);
			
		}
		//console.log("IDF: " + idf);
		//console.log(sqli[t][0]);
		tf_idf = TF_IDF(tf, idf);
		norma = norma + Math.pow(tf_idf, 2);
		
		//console.log("TF-IDF: " + tf_idf);
		//console.log("Norma: " + norma);
		document = {termino: terminos[t][0], cantidad: terminos[t][1], tf: tf, idf: idf, tf_idf: tf_idf, norma: 0};
		arrayDocument.push(document);
	}
	norma = Math.sqrt(norma);
	for(t in arrayDocument){
		arrayDocument[t].norma = norma;
	}

	return arrayDocument;

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

function myIndexOf2(tokens, trigramas){
	//console.log("con pos");
	var cont = 0;
	var suma = 0;
	var band = false;
	if(trigramas.length > 0 ){
		while(cont<trigramas.length){
			if(tokens[0]===trigramas[cont].termino[0] && tokens[1]===trigramas[cont].termino[1] && tokens[2] === trigramas[cont].termino[2]){
				
				return cont;
			}
			cont = cont + 1;
		}
	}

	return -1;
}

function semejanza(tokens, trigramas){
	//console.log("con pos");
	
	var suma = 0;
	var band = false;
	if(trigramas.length > 0 ){
		for(t in trigramas){
			var cont = 0;
			while(cont<trigramas.length){
				if(tokens[cont].termino[0]===trigramas[t].termino[0] && tokens[cont].termino[1]===trigramas[t].termino[1] && tokens[cont].termino[2] === trigramas[t].termino[2]){
					suma = suma + (tokens[cont].tf_idf * trigramas[t].tf_idf);
					break;
					//return cont;
				}
				cont = cont + 1;
			}
		}
	}

	return suma;
}

function sim(terminos, coleccion, triTokens, cantidad, c){
	MongoClient.connect('mongodb://127.0.0.1:27017/demoTesis2', function(err, db){
		if(err){
			console.log(err);
			throw err;
		}else{
			var col = db.collection(coleccion);
			var q = { termino: { $in: terminos } };
			col.find(q).toArray(function(err, resultado){
			if(err){
				console.log(err);
				throw err;
			}else{
				db.close();
				//console.log("resultados: " + resultado.length);
				
				var array = generaPesos(triTokens, cantidad, resultado, resultado.length);
				var suma = semejanza(array, resultado);
				console.log(resultado);
				//console.log(cantidad);
				console.log(suma);
				var mult = array[0].norma * resultado[0].norma;
				var res = suma/mult;
				console.log(res);
				//console.dir(resultado[0].suma);

			}
			
		});
		}
	});
}

function getDoc(coleccion){
	MongoClient.connect('mongodb://127.0.0.1:27017/demoTesis2', function(err, database){
		if(err){
			console.log(err);
			throw err;
		}
		var db = database;
		var col = db.collection(coleccion);

		col.find().toArray(function(err, resultado){
			if(err){
				console.log(err);
				throw err;
			}else{
				console.dir(resultado);
				//console.dir(resultado[0].suma);

			}
			db.close();

		});

	});
}

//Se obtiene la suma del dato pasado
function getSuma(coleccion){
	MongoClient.connect('mongodb://127.0.0.1:27017/demoTesis2', function(err, database){
		if(err){
			console.log(err);
			throw err;
		}
		var db = database;
		db.collection(coleccion).aggregate({$group: {_id: null, "suma":{$sum: "$idf"}}}, function(err, resultado){
			if(err){
				console.log(err);
				throw err;
			}else{
			sumIdf = resultado[0].suma;
			//console.dir(resultado[0].suma);

			}
			db.close();

		});

	});
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

function peticionPost(request, post){
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

function getDocumento(trigramas){
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
}

/* Obtener pesos */
function TF(terminoCant, cantidadDoc){

	tf = terminoCant/cantidadDoc;
	return tf;
}

function IDF(documentos){
	//idf = Math.log(documentos);
	var idf = log2(2, documentos);
	return idf;
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
exports.clasificar = clasificar;
