const assert = require('chai').assert

describe('options', () => {
  const options = require('../src/options')
  
  it('will parse string', () => {
    const template = 'convert {{ in }} {{ out }}'
        , result = options(template)

    assert.isObject( result )
  })
})
