const assert = require('chai').assert
    , isWindows = process.platform == 'win32'
    , pathlib = require('path')
    , local = pathlib.resolve.bind( pathlib, __dirname )
    , argsToJSON = local( 'command', 'argsToJSON.js' )

describe('exec', function () {
  const exec = require('../src/exec')

  it('will work', function () {
    const result = exec(
      { template: '{{ command }} --foo bar', json: true },
      { command: argsToJSON }
    )

    assert.isObject( result )
    assert.isFunction( result.then )

    return result
      .tap( ( res ) => {
        assert.isNumber( res.pid )
        assert.equal( res.exitCode, 0 )
        assert.isObject( res.data )
        assert.equal( res.data.foo, 'bar' )
      } )
  })
})
