var path = require('path');

var server = require(path.join(process.cwd(),'/lib/server'));
var port = process.env.PORT || 1337;
server(port);
console.log('server running on http://localhost:'+port);
