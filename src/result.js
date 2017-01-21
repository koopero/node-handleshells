const _ = require('lodash')

function result( proc, stdout, stderr ) {
  const res = _.pick( proc, [ 'pid', 'exitCode' ] )

  res.stdout = stdout
  res.stderr = stderr

  res.data = null
  try {
    res.data = JSON.parse( stdout )
  } catch ( e ) {
    // Not JSON, not big deal
  }

  res.dataerr = null
  try {
    res.dataerr = JSON.parse( stderr )
  } catch ( e ) {
    // Not JSON, not big deal
  }



  return res
}

module.exports = result
