function options( opt ) {
  if ( 'string' == typeof opt ) {
    opt = { template: opt }
  }

  return opt
}

module.exports = options
