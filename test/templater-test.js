const
  ass = require('chai').assert,
  eq = ass.equal,
  templater = require('../src/templater')(),
  isWindows = process.platform == 'win32'
;

function run( template, context ) {
  return templater.compile( template )( context )
}

describe('template', function () {
  it('should work', function () {
    eq( run( '{{ foo }}', { foo: 'bar' } ), 'bar' )
  })

  it('should escape', function () {
    eq( run( '{{ foo }}', { foo: 'bar baz' } ), "'bar baz'" )
  })

  it('should join paths', function () {
    eq( run( '{{join path sub "baz" }}', { path: 'foo', sub: 'bar'} ), isWindows ? "foo\\bar\\baz" : "foo/bar/baz" )
  });


  it('should flatten args', function () {
    eq( run( '{{args this }}', { foo: 'bar baz' } ), "--foo 'bar baz'" )
  });


});
