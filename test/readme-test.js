const handleshells = require('..')
    , assert = require('chai').assert

describe('README', () => {
  it('compile example', () => {
    assert.equal(
      handleshells.compile( 'touch {{ file }}', { file: 'foo.txt' } ),
      'touch foo.txt'
    )  
  })

  it('exec example', () => {
    handleshells.exec( 'echo {{ text }}', { text: 'Hello, world!'} )
      .then( ( result ) => {
        assert.equal( result.stdout, 'Hello, world!\n' )
      } )
  })

  it('args example', () => {
    const options = {
      a: 'foo',
      bar: 'baz qux'
    }

    assert.equal(
      handleshells.compile('{{ args options }}', { options } ),
      "-a foo --bar 'baz qux'"
    )
  })

  it('join example', () => {
    const dir = 'bar'
        , file = 'foo.txt'

    assert.equal(
      handleshells.compile('{{join "/tmp" dir file }}', { dir, file } ),
      "/tmp/bar/foo.txt"
    )
  })
})
