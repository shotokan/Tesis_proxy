var natural = require('natural'),
	 TfIdf = natural.TfIdf,
    tfidf = new TfIdf();
    var _ = require("underscore")._;

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

exports.pesos = pesos;
exports.listarPesos = listarPesos;