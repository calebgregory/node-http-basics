var http = require('http');
var https = require('https');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

var log = require(path.join(process.cwd(),'/lib/printlog'));

module.exports = function(port) {
  http.createServer(function(req,res){

    if (req.method === 'GET' && req.url === '/weather') {

      res.writeHeader(200, {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : '*'
      });

      https.get('https://api.forecast.io/forecast/52b0f2a10c9f18f8bda8331485c532de/36.1658,-86.7777')
        .on('response', function (xhr) {
          xhr.pipe(res);
        });

      log(req,res);

    } else if (req.method === 'GET' && req.url === '/starwars') {

      res.writeHeader(200, {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : '*'
      });

      http.get('http://swapi.co/api/films/')
        .on('response', function (xhr) {
          var body = '';
          xhr
            .on('data', function (chunk) {
               body += chunk;
            })
            .on('end', function () {
              var data = JSON.parse(body)

              data.results.forEach(function(r) {
                res.write(r.title + '\n');
              });

              res.end();
            });
        });

      log(req,res);

    } else if(req.method === 'GET' && req.url.slice(0,4) === '/cal') {

      res.writeHead(200, {
        'Content-Type' : 'text/plain'
      });

      res.end('yeah . . . this lives somewhere else sry');
      log(req,res);

    } else if(req.method === 'GET' && req.url === '/news') {

      request.get('http://reddit.com', function(err,response,body) {
        var $ = cheerio.load(body);
        $('a').attr('href','http://www.youtube.com/watch?v=dQw4w9WgXcQ');
        res.end($.html());
      });

    } else if(req.method === 'GET' && req.url === '/topnews') {

      request.get('http://reddit.com', function(err,response,body) {
        $ = cheerio(body);
        res.end($.find('#siteTable a.title').text());
      });

    } else {

      res.writeHead(403);
      res.end('Access Denied!\n');

      log(req,res);

    }

  }).listen(port);
}
