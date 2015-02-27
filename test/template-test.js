const
  ass = require('chai').assert,
  HB = require('../').Handlebars,
  isWindows = process.platform == 'win32'
;

describe('template', function () {
  it('should work', function () {
    var template = HB.compile('{{ foo }}');
    ass.equal( template( { foo: 'bar' } ), 'bar' );
  });

  it('should escape', function () {
    var template = HB.compile('{{ foo }}');
    ass.equal( template( { foo: 'bar baz' } ), "'bar baz'" );
  });

  it('should join paths', function () {
    var template = HB.compile('{{join path sub }}');
    ass.equal( template( { path: 'foo', sub: 'bar'} ), isWindows ? "foo\\bar" : "foo/bar" );
  });

  it('should use a given pathlib', function () {
    var Handlebars = require('../').createHandlebars( {
      pathlib: require('path').win32
    })
    var template = Handlebars.compile('{{join path sub }}');
    ass.equal( template( { path: 'foo', sub: 'bar'} ), "foo\\bar" );
  });


});
