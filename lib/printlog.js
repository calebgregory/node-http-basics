var fs = require('fs');
var path = require('path');

var log = require(path.join(process.cwd(),'/lib/log'));

module.exports = function(req,res) {

  fs.appendFile('logfile.log',log.printNoColors(req,res),function(err){
    if(err) throw err;
  });

  console.log(log.print(req,res));
};
