var path = require('path');
var math = require(path.join(process.cwd(),'/lib/maths'));

var zeller = {

  convertMonth : function(m) {

    return (m === 1) ? 13 :
           (m === 2) ? 14 :
           m;

  },
  convertYear : function(y,m) {
    return (m < 3) ? --y : y;

  },
  decodeDay : function(d) {

    return (d === 0) ? 7 : d;

  },
  decodeMonth : function(m) {

    return (m === 13 || m === 14) ? (m - 12) : m;

  },
  decodeYear : function(m,y) {

    return (m === 13 || m === 14) ? (y + 1) : y;

  },
  weekday : function(y,m,d) {

    y = this.convertYear(y,m);
    m = this.convertMonth(m);
    var K = this.yearOfTheCentury(y),
        J = this.zeroBasedCentury(y);
    var encodedWeekday = math.mod((
      d
      + Math.floor( (13*(m+1)) / 5 )
      + K
      + Math.floor( K / 4 )
      + Math.floor( J / 4 )
      + 5*J
    ), 7);

    return this.decodeDay(encodedWeekday);

  },
  yearOfTheCentury : function(y) {

    return y % 100;

  },
  zeroBasedCentury : function(y) {

    return Math.floor(y / 100);

  },

};

module.exports = zeller;
