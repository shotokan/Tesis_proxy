var natural = require('natural');

var tokenizer;
function get_tokens(cabeceras){
	tokenizer = new natural.WordPunctTokenizer();
	var tokens = tokenizer.tokenize(cabeceras);
/*
var ar = ["Banana", "Orange", "Apple", "Mango", "Banana"];
var a = ar.indexOf("Banana");
while(a!==-1){
	var a = ar.indexOf("Banana");
	console.log(ar.splice(a,1));
	console.log(ar);
}
*/
return tokens;
}
exports.get_tokens = get_tokens;