module.exports = Cmd;

const
  _ = require('lodash'),
  async = require('async'),
  chipro = require('child_process'),
  handlebars = require('./templater')
;


function Cmd ( cmdOpt ) {
  var cmdArgs = _.slice( arguments );
  cmdArgs.shift();
  // Parse arguments

  if ( 'string' == typeof cmdOpt ) {
    cmdOpt = {
      template: cmdOpt
    }
  }

  var
    cmdHB = handlebars( cmdOpt ),
    cmdTemplate = cmdHB.compile ( cmdOpt.template )
  ;

  //
  //  Finalize Cmd
  //
  if ( cmdArgs.length  ) {
    return Ctx.apply( this, cmdArgs );
  } else {
    return Ctx;
  }
  //
  //  Ctx
  //

  function Ctx( ctxOpt ) {
    var ctxArgs = _.slice( arguments );
    ctxArgs.shift();

    var ctx = ctxOpt;


    var ctxCommandStr = cmdTemplate( ctx );

    //
    var ctxRun = ctxExec;

    ctxRun.command = ctxCommandStr;
    ctxRun.spawn = '';

    if ( ctxArgs.length ) {
      ctxRun.apply( this, ctxArgs );
    } else {
      return ctxRun;
    }

    function ctxExec( opt, cb ) {
      if ( 'function' == typeof opt ) {
        cb = opt;
        opt = {};
      }

      var process = chipro.exec( ctxCommandStr, opt, ctxExecResultParser( cb ) );
      return process;

      function ctxExecResultParser( cb ) {
        return function ( err, stdout, stderr ) {
          if ( cb ) {
            var result = {
              stdout: stdout,
              stderr: stderr,
              process: process
            };

            try {
              result.json = JSON.parse( stdout )
            } catch (e) {
              // Yeah, it ain't JSON. Shit happens;
            }

            cb( err, result )
          }
        }
      }
    }
  }
}