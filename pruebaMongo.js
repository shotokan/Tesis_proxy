var MongoClient = require('mongodb').MongoClient;
 MongoClient.connect('mongodb://localhost:27017/demo', function(err, db){
	if(err) throw err;
	//insertar(db, {j:"10", k:"11", l:"12"});
	/*db.collection('things').findOne({}, function(err, doc){
		if (err) throw err;
		console.dir(doc);
		db.close();
	});
	console.dir("Called findOne"); */
	db.collection('things').findAndModify(
  {a: 1}, // query
  [['_id','asc']],  // sort order
  {$inc: {a: 1}}, // replacement, replaces only the field "hi"
  {new: true}, // options
  function(err, object) {
      if (err){
      	console.warn("NO ENTre");
          console.warn(err.message);  // returns error if no matching object found
      }else{
      	
      	if(object != null){
          console.dir(object);

      	}else{
      		console.warn("Insertar el nuevo termino");
      	}
      }
      db.close();
  });
});


/*
* Verifica si existe un término, si existe incrementa la cantidad en uno
* si no existe, inserta el nuevo término
 */
function verificarTermino(term, tipo){
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
 */
function insertar(db, term, tipo, dato){
	var document = {termino: term, cantidad: 1, tf: 0, idf: 0, tf_idf: 0, norma: 0, documentos: {doc1:true, doc2:false}};
	MongoClient.connect('mongodb://localhost:27017/demo', function(err, db){
		if(err) throw err;
		if(tipo === "SQLi"){

			db.collection("terminos_sqli").insert(dato, {w: 1}, function(err, records){
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

function actualizar(db, tipo, termino, id){
	db.collection("terminos_sqli").update
}

function conexion(termino, tipo){
	MongoClient.connect('mongodb://localhost:27017/demoTesis', function(err, db){
		if(err) throw err;
		db.collection('terminos_sqli').findOne({}, function(err, doc){
			if (err) throw err;
			console.dir(doc);
			db.close();
		});
		console.dir("Called findOne");
	
	});
}

//id, Tf, Idf, Tf-idf, termino, cantidad, norma