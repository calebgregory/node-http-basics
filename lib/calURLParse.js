  // /cal/2015/1  {year: 2015,month: 1}   ./cal 1 2015
  // /cal/1/2015  {year: 2015,month: 1}   ./cal 1 2015
  // /cal/2015    {year: 2015}            ./cal 2015
  // /cal         {}                      ./cal

module.exports = function(route) {
  var cmd;
  route = route.split('/').slice(1);

  if (route[0] === 'cal') {
    cmd = route[0];
    route = route.slice(1);
  }

  var output = route.reduce(function(obj,arg) {
    if(arg<13) obj.month = arg;
    else obj.year = arg;
    return obj;
  },{});

  return output;
}
