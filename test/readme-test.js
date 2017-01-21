const handleshells = require('..')
    , assert = require('chai').assert

describe('README', () => {
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
