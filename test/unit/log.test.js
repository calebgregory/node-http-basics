var expect = require('chai').expect;

var chalk = require('chalk');
var path = require('path');

var log = require(path.join(process.cwd(),'/lib/log'));

describe('Log', function() {

  describe('#errorMsg()', function() {

    it('should generate an error based on the status code and status message', function() {
      res = {};
      res.statusCode = 404;
      res.statusMessage = 'Not found';

      expect(log.errorMsg(res)).to.equal('Error (' + chalk.red('404') + '): "' + chalk.red('Not found') + '"');
    });

  });

  describe('#request()', function() {

    it('should return the method and the url of a req in blue if res is 200', function() {
      var req = { method : 'GET', url : '/weather' };
      var res = { statusCode : 200 }

      expect(log.request(req,res)).to.equal(chalk.cyan('GET /weather'));
    });

    it('should return the method and the url of a req in red if res not 200', function() {
      var req = { method : 'GET', url : '/weather' };
      var res = { statusCode : 404 }
      expect(log.request(req,res)).to.equal(chalk.red('GET /weather'));

    });

  });

  describe('#userAgent()', function() {

    it('should return information about the clients browser', function() {
      var req = {};
      req.headers = { 'user-agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2468.2 Safari/537.36' }
      expect(log.userAgent(req)).to.equal('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2468.2 Safari/537.36');
    });

  });

  describe('#print()', function() {
    var date = (new Date()).toUTCString();
    var req = {
          method : 'GET',
          url : '/weather',
          headers : {
            'user-agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2468.2 Safari/537.36'
          }
        },
        res = {
          _header : [
            'HTTP/1.1 200 OK\n',
            'Content-Type: application/json\n',
            'Access-Control-Allow-Origin: *\n',
            'Date: Thu, 30 Jul 2015 15:40:36 GMT\n',
            'Connection: keep-alive\n',
            'Transfer-Encoding: chunked\n'
          ].join('')
        }

    it('should print a log of a successful req/res', function() {
      res.statusCode = 200;

      expect(log.print(req,res)).to.equal('['+date+'] "' + chalk.cyan('GET /weather') + '" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2468.2 Safari/537.36"');
    });

    it('should print a log of a failed req/res', function() {
      res.statusCode = 404;
      res.statusMessage = 'Not found';

      expect(log.print(req,res)).to.equal('['+date+'] "' + chalk.red('GET /weather') + '" Error (' + chalk.red('404') + '): "' + chalk.red('Not found') + '"');
    });

  });
});
