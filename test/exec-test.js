const
  ass = require('chai').assert,
  eq = ass.equal,
  HS = require('../'),
  isWindows = process.platform == 'win32',
  pathlib = require('path'),
  local = pathlib.resolve.bind( pathlib, __dirname ),
  argsToJSON = local( 'command', 'argsToJSON.js' )
;


describe('cmd', function () {
  it('should curry', function () {
    ass.isFunction( 
      HS( '' )
    )
  })
})

describe('command', function () {
  it( 'should return a string', function () {
    console.log( )
    eq( 
      HS(
        '{{ baz }}bar',
        { baz: 'foo' }
      ).command,
      "foobar"
    )
  })
})


describe('exec', function () {


  it('should run by default', function ( cb ) {
    HS( 
      '{{ command }} --foo bar', 
      { command: argsToJSON },
      function ( err, result ) {
        eq( result.json.foo, 'bar' );
        cb();
      } )
  })


})