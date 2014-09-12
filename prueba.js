var tokens = require('./token');

var http = require('http');

var pos = 0;
var arr = ['a', 'b', 'c', 'c','e','i','c','m','c'];
while(pos != -1){
pos = arr.indexOf( 'c' );
pos > -1 && arr.splice( pos, 1 );
console.log(arr);  // imprime: a,b,d
console.log(pos);

}
