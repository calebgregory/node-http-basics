var path = require('path');

var server = require(path.join(process.cwd(),'/lib/server'));
server(1337);
console.log('server running on http://localhost:1338');
