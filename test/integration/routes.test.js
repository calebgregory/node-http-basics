var expect = require('chai').expect;
var http = require('http');
var path = require('path');

describe('routes', function() {

  var port = Math.floor(Math.random() * 30000 + 10000);

  before(function() {

    require(path.join(process.cwd(),'/lib/server'))(port);

  });

  it('should respond to the /weather route', function(done){

    http.get('http://localhost:'+port+'/weather', function(res) {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.contain('°');
      done();
    });

  });

});
