var expect = require('chai').expect;
var http = require('http');
var path = require('path');

describe('routes', function() {

  this.timeout(30000);

  var port = Math.floor(Math.random() * 30000 + 10000);
  var url = 'http://localhost:'+ port;

  before(function() {

    require(path.join(process.cwd(),'/lib/server'))(port);

  });

  it('should not respond to the /nonexistent route', function(done){

    http.get(url+'/nonexistent', function(res) {
      expect(res.statusCode).to.equal(403);
      done();
    });

  });

  it('should respond to the /weather route', function(done){

    http.get(url+'/weather', function(res) {

      var body = '';

      expect(res.statusCode).to.equal(200);

      res.on('data',function(chunk) {
        body+=chunk;
      }).on('end',function() {
        expect(body).to.contain('temperature');
        done();
      });

    });

  });

  it('should respond to the /starwars route', function(done){

    http.get(url+'/starwars', function(res) {

      var body = '';

      expect(res.statusCode).to.equal(200);

      res.on('data',function(chunk) {
        body+=chunk;
      }).on('end',function() {
        expect(body).to.contain('Hope');
        done();
      });

    });

  });

});
