var natural = require('natural'),
fs = require('fs');

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

exports.pesos = pesos;
exports.listarPesos = listarPesos;
exports.leerDocumento = leerDocumento;