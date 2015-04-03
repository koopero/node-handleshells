const
  fs = require('fs'),
  pathlib = require('path'),
  resolve = pathlib.resolve

module.exports = function loadDir() {
  const
    path = resolve.apply( this, arguments ),
    result = {},
    files = 
      fs.readdirSync( path )
      .map( function ( filename ) {
        return false 
          || filename[0] == '.'
          || filename == 'index.js'
          ?
            null
          :
            resolve( path, filename )
      })
      .filter( function ( filename ) {
        return !!filename
      })
    
  files.forEach( function ( filename ) {
    const
      key = pathlib.basename( filename, pathlib.extname( filename ) )

    result[key] = require( resolve( path, filename ) );
  } )

  return result
}