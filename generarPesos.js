var guardar = require('./guardarfs'),
    normalizar = require('./token'),
    docs = require('./documentos');

var archivo = docs.leerDocumento("Sqli");
var arrays = normalizar.tokens(archivo);

//console.log(normalizar.trim(": "));
//console.log(normalizar.trim(" /"));
console.log(arrays);
