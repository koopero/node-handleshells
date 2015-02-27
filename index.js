const
  _ = require('underscore'),
  async = require('async'),
  child_process = require('child_process'),
  HB = createHandlebars()
;

exports.Handlebars = HB;
exports.createHandlebars = createHandlebars;

function createHandlebars( opt ) {
  opt = opt || {};

  console.log( opt );

  var
    HB = require('handlebars').create(),
    pathlib = opt.pathlib || require('path')
  ;

  HB.escapeExpression = escapeShell;
  HB.Utils.escapeExpression = escapeShell;

  HB.registerHelper('join', function () {
    var args = Array.prototype.slice.call( arguments );
    args = args.filter( function ( arg ) { return 'string' == typeof arg } );
    return pathlib.join.apply( pathlib, args );
  });

  return HB;


}

function handleShells( command, context, cb ) {

  function bindContext( context ) {

    function command() {
      return template( context );
    }

    function execSync( options ) {
      return child_process.execSync.bind( this, command() ).apply( arguments );
    }

    function exec( options, cb ) {
      return child_process.exec.bind( this, command() ).apply( arguments );
    }
  }
}



function escapeShell( str ) {
  return require('shell-escape')([ str ]);
}
