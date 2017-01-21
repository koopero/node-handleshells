const _ = require('lodash')
function context( opt ) {
  const result = {}

  for ( var i = 1; i < arguments.length; i ++ ) {
    _.merge( result, arguments[i])
  }

  return result
}

module.exports = context
