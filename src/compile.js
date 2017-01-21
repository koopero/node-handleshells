const options = require('./options')
    , context = require('./context')
    , templater = require('./templater')

function compile( opt, args ) {
  opt = options( opt )
  const ctx = context.apply( null, arguments )
  return templater().compile( opt.template )( ctx )
}

module.exports = compile
