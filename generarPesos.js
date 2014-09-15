var guardar = require('./guardarfs'),
    normalizar = require('./normalizacion'),
    docs = require('./documentos');

var archivo = docs.leerDocumento("Sqli");
var arrays = normalizar.tokens(archivo);
var contador = 0;
for (var c in arrays){
	for(var d in arrays){
		if(arrays[c] === arrays[d]){
			console.log(arrays[c]);
			console.log(arrays[d]);
			contador = contador + 1;
			console.log(contador);
		}
	}
	console.log(contador);
	contador = 0;
	//docs.verificarTermino(arrays[c], "SQLi");
}
//console.log(normalizar.trim(": "));
//console.log(normalizar.trim(" /"));
//console.log(arrays);
