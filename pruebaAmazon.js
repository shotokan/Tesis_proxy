var MongoClient = require('mongodb').MongoClient;
 MongoClient.connect('mongodb://ec2-54-68-84-126.us-west-2.compute.amazonaws.com:27017/demo', function(err, db){
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