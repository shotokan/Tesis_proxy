var fs = require('fs');
var f = new Date();
var fecha = f.getDate() + (f.getMonth() + 1) +  f.getFullYear()+"-"+f.getHours()+f.getMinutes()+f.getSeconds()+f.getMilliseconds();
fs.mkdirSync('./Nuevo' + fecha);