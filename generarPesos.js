var guardar = require('./guardarfs'),
    normalizar = require('./token'),
    docs = require('./documentos');

var archivo = docs.leerDocumento("Sqli");
var arrays = normalizar.tokens2(archivo.toLowerCase());
for(var c in arrays){
	arrays[c] = normalizar.trim(arrays[c]);
	//console.log(normalizar.trim(arrays[c]));
}
//console.log(normalizar.trim(": "));
//console.log(normalizar.trim(" /"));
console.log(arrays);
