const options = require('./options')
    , compile = require('./compile')
    , result = require('./result')
    , Promise = require('bluebird')
    , child_process = require('child_process')

function exec( opt ) {
  opt = options( opt )
  const command = compile.apply( null, arguments )
      , execOpt = opt

  return Promise.fromCallback( ( cb ) => {
    const proc = child_process.exec( command, function ( err, stdout, stderr ) {
      if ( err )
        cb( err )

      cb( null, result( proc, stdout, stderr ) )
    } )
  })
}

module.exports = exec
