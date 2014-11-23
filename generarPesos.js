var guardar = require('./guardarfs'),
    normalizar = require('./normalizacion'),
    docs = require('./documentos');
var MongoClient = require('mongodb').MongoClient;

function terminos(){

	var archivo = docs.leerDocumento("Sqli");
	var arrays = normalizar.tokens(archivo);
	var contador = 0;
	var pos = 0;
	var arrayCopy=[];
	var pesos=[];
	var cont2=0;
	var band=0;
	//pos = arrays.indexOf('-');
	//console.log(arrays[pos]);
	//console.log(pos);
	for (var c in arrays){
		band = band +1;
		/*for(var d in arrays){
			if(arrays[c] === arrays[d]){
				console.log(arrays[c]);
				console.log(arrays[d]);
				contador = contador + 1;
				console.log(contador);
			}
		}*/
		//console.log("for");
		//Verifica los términos repetidos para realizar su conteo
		while(arrayCopy.indexOf(arrays[c]) === -1){
			arrayCopy.push(arrays[c]);
			while(pos != -1){
				//console.log(arrays[c]);
				//console.log(pos);
				pos = arrays.indexOf(arrays[c], pos);
				//console.log("COntador: " + contador);
				if (pos != -1){
					//console.log("EN IF")
					contador = contador + 1;
					//console.log("Contador2 : " +contador);
					pos = pos +1;
				}

			}
			//console.log(arrays[c]);
			//console.log(contador);
			pesos[cont2] = [arrays[c], contador];
			cont2 = cont2 + 1;
			contador = 0;
			pos = 0;
		}
		
		//docs.verificarTermino(arrays[c], "SQLi");
		
	}
	console.log(pesos);
	console.log(band);
	generaPesos(pesos, cont2);
	return pesos;
}
//id, termino, Cantidad, peso tf, peso IDF, valor TF-IDF, Norma 
function generaPesos(terminos, cantidad){
	var documento = [];
	var arrayTFIDF = [];
	for(var t in terminos){
		var peso_tf = TF(terminos[t][1], cantidad);
		var peso_idf = IDF(2/1);
		var peso_tf_idf = TF_IDF(terminos[t][1], peso_idf);
		arrayTFIDF[t] = peso_tf_idf;
		var simi = Norma(arrayTFIDF);
		documento[t] = {termino: terminos[t][0], cantidad: terminos[t][1], tf: peso_tf, idf: peso_idf, tf_idf: peso_tf_idf, norma:simi};
		insertar("SQLi", documento[t]);
	}
	console.log('Inicia el documento....');
console.log(documento);
return documento;

}

function TF(terminoCant, cantidadDoc){

		tf = terminoCant/cantidadDoc;
		return tf;	
}

function IDF(documentos){
	//idf = Math.log(documentos);
	var idf = log2(2, documentos);
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
	tf_idf = tf * idf;
	return tf_idf;
}


//
function guardarPesos(pesosArray, tipo){
	MongoClient.connect('mongodb://localhost:27017/demo', function(err, db){
		if(err) throw err;
		//insertar(db, {j:"10", k:"11", l:"12"});
		/*db.collection('things').findOne({}, function(err, doc){
			if (err) throw err;
			console.dir(doc);
			db.close();
		});
		console.dir("Called findOne"); */
		if(tipo === "SQLi"){
			db.collection('terminos_sqli').findAndModify(
				{termino: term}, // query
				[['_id','asc']],  // sort order
			  	{$inc: {cantidad: 1}}, // replacement, replaces only the field "hi"
			  	{new: true}, // options
			  	function(err, object) {
			      if (err){
			          console.warn(err.message);  // returns error if no matching object found
			      }else{
			          console.dir(object);
			      }
			      db.close();
		  	});
		}else{

		}
	});
}

/*
* Se inserta el nuevo término
* id, termino, Cantidad, peso tf, peso IDF, valor TF-IDF, Norma 
*/
function insertar(tipo, dato){
	//var document = {termino: term, cantidad: 1, tf: 0, idf: 0, tf_idf: 0, norma: 0};
	MongoClient.connect('mongodb://localhost:27017/demoTesis', function(err, db){
		if(err) throw err;
		if(tipo === "SQLi"){
			db.collection("terminos_sqli1").insert(dato, {w: 1}, function(err, records){
		  		console.log("Record added as "+records[0]._id);
		  		db.close();
			});
		}else{
			db.collection("terminos_normal").insert(dato, {w: 1}, function(err, records){
		  		console.log("Record added as "+records[0]._id);
		  		db.close();
			});
		}
	});

}

terminos();