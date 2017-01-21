const
  _ = require('lodash'),
  escape = require('../escape'),
  handlebars = require('handlebars')

module.exports = function argsBuilder ( opt, hb ) {
  opt = opt || {};
  const pathlib = opt.pathlib || require('path')

  return function args() {
    var inputArgs = _.slice( arguments )
    var fn = inputArgs.pop()
    var argsHash = {}

    inputArgs.forEach( function ( inputArg ) {
      if ( _.isObject( inputArg ))
        _.extend( argsHash, inputArg )
      else if ( inputArg )
        argsHash[inputArg] = argsHash[inputArg] || true
    })

    _.extend( argsHash, fn.hash )

    var argsArr = []

    _.forEach( argsHash, function eachArg( v, k ) {
      if ( k[0] != '-' )
        k = (k.length > 1 ? '--' : '-') + k

      if ( v === true )
        v = '';

      if ( v === false )
        return

      if ( v || v === 0 )
        k += ' '+escape( v )

      argsArr.push( k )
    })

    var result = argsArr.join(' ')

    if ( result )
      return new hb.SafeString( result )

    return ''
  }
};
