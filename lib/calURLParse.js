// /cal/2015/1 => {year: 2015,month: 1}  => ./cal 1 2015
// /cal/1/2015 => {year: 2015,month: 1}  => ./cal 1 2015
// /cal/2015   => {year: 2015}           => ./cal 2015
// /cal        => {}                     => ./cal

module.exports = function(route) {
  var cmd;                                    // e.g.,
  route = route.split('/').slice(1);          // /cal/1/2015

  if (route[0] === 'cal') {
    cmd = route[0];
    route = route.slice(1);
  }

  var json = route.reduce(function(obj,arg) {
    if(isNaN(+arg)) cmd = undefined; // error check for command injection
    else if(arg<13) obj.month = arg;
    else obj.year = arg;
    return obj;
  },{});

  cmd = cmd ? './'+cmd : undefined;         // ./cal || undefined if any argument is not a number
  cmd += json.month ? ' ' + json.month : '';// ./cal 1
  cmd += json.year ? ' ' + json.year : '';  // ./cal 1 2015

  return cmd;
}
