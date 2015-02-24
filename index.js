const
  _ = require('underscore'),
  async = require('async'),
  child_process = require('child_process'),
  HB = require('handlebars').create()
;

HB.escapeExpression = escapeShell;
HB.Utils.escapeExpression = escapeShell;


function handleShells( command, opt, context, cb ) {

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
