var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/demo', function(err, db){
	if(err) throw err;
	db.collection('things').findOne({}, function(err, doc){
		if (err) throw err;
		console.dir(doc);
		db.close();
	});
	console.dir("Called findOne");
});