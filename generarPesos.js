var guardar = require('./guardarfs'),
    normalizar = require('./normalizacion'),
    docs = require('./documentos');

var archivo = docs.leerDocumento("Sqli");
var arrays = normalizar.tokens(archivo);
var contador = 0;
var pos = 0;
//pos = arrays.indexOf('-');
//console.log(arrays[pos]);
//console.log(pos);
for (var c in arrays){
	/*for(var d in arrays){
		if(arrays[c] === arrays[d]){
			console.log(arrays[c]);
			console.log(arrays[d]);
			contador = contador + 1;
			console.log(contador);
		}
	}*/
	//console.log("for");
	while(pos != -1){
		//console.log(arrays[c]);
		//console.log(pos);
		pos = arrays.indexOf(arrays[c], pos);
		//console.log("COntador: " + contador);
		if (pos != -1){
			//console.log("EN IF")
			contador = contador + 1;
			//console.log("Contador2 : " +contador);
			pos = pos +1;
		}

	}
	console.log(arrays[c]);
	console.log(contador);
	contador = 0;
	//docs.verificarTermino(arrays[c], "SQLi");
	pos = 0;
}
//console.log(normalizar.trim(": "));
//console.log(normalizar.trim(" /"));
//console.log(arrays);
