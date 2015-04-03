const
  _ = require('lodash'),
  handlebars = require('handlebars'),
  requireDir = require('./requireDir')
;

module.exports = function templater( opt ) {
  opt = opt || {};
  var
    HB = handlebars.create(),
    pathlib = opt.pathlib || require('path')
  ;

  HB.escapeExpression = HB.Utils.escapeExpression = require('./escape.js');

  _.forEach(
    requireDir( __dirname, 'helpers'),
    function ( helperBuilder, key ) {
      
      const helper = helperBuilder( opt, HB )
      HB.registerHelper( key, helper )
    }
  )

  return HB;
}
