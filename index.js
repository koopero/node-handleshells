const
  HB = require('handlebars').create()
;

HB.escapeExpression = escapeShell;
HB.Utils.escapeExpression = escapeShell;

var test = HB.compile( "--= {{ foo }} =--" );


console.log( test({ foo: 'b&r '} ) );

function escapeShell( str ) {
  return str.toUpperCastse();
}
