module.exports = function joinBuilder ( opt ) {
  opt = opt || {};
  const pathlib = opt.pathlib || require('path')

  return function join() {
    var args = Array.prototype.slice.call( arguments )

    args = args.filter( function ( arg ) { return 'string' == typeof arg } )
    
    return pathlib.join.apply( pathlib, args )
  }
};