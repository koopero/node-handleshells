const assert = require('chai').assert
    , equal = assert.equal
    , templater = require('../src/templater')()
    , isWindows = process.platform == 'win32'

describe('compile', function () {
  const compile = require('../src/compile.js')
  it('should work', function () {
    equal( compile( '{{ foo }}', { foo: 'bar' } ), 'bar' )
  })

  it('should escape', function () {
    equal( compile( '{{ foo }}', { foo: 'bar baz' } ), "'bar baz'" )
  })

  it('should join paths', function () {
    equal( compile( '{{join path sub "baz" }}', { path: 'foo', sub: 'bar'} ), isWindows ? "foo\\bar\\baz" : "foo/bar/baz" )
  })

  describe('args', () => {
    it('will flatten double-dash args', function () {
      equal(
        compile( '{{ args this }}', { foo: 'bar baz', qux: 15 } ),
        "--foo 'bar baz' --qux 15"
      )
    })

    it('will flatten single-dash args', function () {
      equal(
        compile( '{{ args this }}', { a: 'bar', b: 15 } ),
        "-a bar -b 15"
      )
    })

    it('will pass true as option', function () {
      equal(
        compile( '{{ args this }}', { a: true } ),
        "-a"
      )
    })

    it('will not pass false', function () {
      equal(
        compile( '{{ args this }}', { a: false } ),
        ''
      )
    })

    it('will pass 0', function () {
      equal(
        compile( '{{ args this }}', { a: 0 } ),
        '-a 0'
      )
    })
  })


})
