var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/demo', function(err, db){
	if(err) throw err;
	insertar(db, {j:"10", k:"11", l:"12"});
	/*db.collection('things').findOne({}, function(err, doc){
		if (err) throw err;
		console.dir(doc);
		db.close();
	});
	console.dir("Called findOne");*/
	
});

function insertar(db, document){
	//var document = {g:"7", h:"8", i:"9"};
	db.collection("things").insert(document, {w: 1}, function(err, records){
  		console.log("Record added as "+records[0]._id);
  		db.close();
	});

}

//id, Tf, Idf, Tf-idf, termino, cantidad, norma