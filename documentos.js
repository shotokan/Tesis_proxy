var natural = require('natural'),
fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

function pesos(cabeceras){
	console.log("Es un ARRAY? " + _.isArray(cabeceras));
	tfidf.addDocument(cabeceras);
	console.log("ARRAY: " + cabeceras);
}

function listarPesos(){

	tfidf.tfidfs(['itmerida'], function(i, measure) {
   	console.log('document #' + i + ' is ' + measure);
	});
	tfidf.listTerms(0 /*document index*/).forEach(function(item) {
    console.log(item.term + ': ' + item.tfidf);
	});
}

function leerDocumento(tipo){
	if (tipo === "Sqli"){
		var archivo = fs.readFileSync('./Sqli/Sqli.txt', 'utf8');
		//console.log('---- Contenido SQLi: ' + archivo + "-----------");
		//fs.close();
		return archivo;
	}else if(tipo == "Normal"){
		var archivo = fs.readFileSync('./Normal/Normal.txt', 'utf8');
		//console.log('---- Contenido SQLi: ' + archivo + "-----------");
		//fs.close();
		return archivo;		
	}
}

/*
* Se guardan los tokens con sus respectivos valores.
* Verifica si existe un término, si existe incrementa la cantidad en uno
* si no existe, inserta el nuevo término
 */
function verificarTermino(term, tipo){
	MongoClient.connect('mongodb://localhost:27017/demoTesis', function(err, db){
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
			      	if(object!=null){

			        	console.dir(object);
			        	db.close();
			      	}else{
			      		insertar(db, term, tipo);
			      	}
			      }
			     
		  	});
		}else{

		}
	});
}


/*
* Se inserta el nuevo término
 */
function insertar(db, term, tipo){
	var document = {termino: term, cantidad: 1, tf: 0, idf: 0, tf_idf: 0, norma: 0};
	if(tipo === "SQLi"){
		db.collection("terminos_sqli").insert(document, {w: 1}, function(err, records){
	  		console.log("Record added as "+records[0]._id);
	  		db.close();
		});
	}else{
		db.collection("terminos_normal").insert(document, {w: 1}, function(err, records){
	  		console.log("Record added as "+records[0]._id);
	  		db.close();
		});
	}

}

exports.pesos = pesos;
exports.listarPesos = listarPesos;
exports.leerDocumento = leerDocumento;
exports.verificarTermino = verificarTermino;
//exports.insertar = insertar;