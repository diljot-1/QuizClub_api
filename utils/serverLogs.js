const fs = require('fs');
const path = require('path');
const serverLogFilePath = path.join(path.normalize(__dirname+"/.."),'/logs/server.log');
const stream  = fs.createWriteStream(serverLogFilePath,{interval:'7d'});
module.exports = stream;