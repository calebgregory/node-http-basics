var chalk = require('chalk');
var path = require('path');

var zc = require(path.join(process.cwd(),'/lib/zeller'));

var log = {
  errorMsg : function(res) {
    var code = res.statusCode,
        msg = res.statusMessage;
    return 'Error ('
      + chalk.red(code)
      + '): "'
      + chalk.red(msg)
      + '"';
  },

  print : function(req,res) {
    var date = (new Date()).toUTCString();
    var output = '['
      + date
      + '] "'
      + this.request(req,res)
      + '" ';
    output += res.statusCode === 200 ?
      '"'+this.userAgent(req)+'"' :
      this.errorMsg(res);
    return output;
  },

  request : function(req,res) {       // r = request

    var request = req.method + ' ' + req.url;

    if (res.statusCode === 200) {
      return chalk.cyan(request);
    } else {
      return chalk.red(request);
    }

  },

  timestamp : function(res) {          // d = date
    return res._header.split('\n')[3].slice(6);
  },

  userAgent : function(req) {
    return req.headers['user-agent'];
  }
};

module.exports = log;
