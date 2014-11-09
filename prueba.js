var natural = require('natural');


var NGrams = natural.NGrams;
var arreglo = ['some' , 'other', 'words', 'here'];
var uri_dec = decodeURIComponent('POST /WackoPicko/users/login.php content-length: 59 accept-language: en-us,en;q=0.5 accept-encoding: gzip,deflate host: 192.168.111.1:8000 accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8 user-agent: sqlmap/1.0-dev (http://sqlmap.org) accept-charset: ISO-8859-15,utf-8;q=0.7,*;q=0.7 connection: close pragma: no-cache cache-control: no-cache,no-store content-type: application/x-www-form-urlencoded; charset=utf-8 username=-7868%27%20OR%20%288337%3D8013%29%23&password=pass');
console.log(uri_dec);
console.log(NGrams.trigrams(uri_dec));

var fs = require( 'fs' );
var path = require( 'path' );

var files = fs.readdirSync(__dirname+'/HTTPSQLi/');

files.forEach(function( file ){
    //var file_name = path.basename( file, '.js' );
    console.log(file);
    
});