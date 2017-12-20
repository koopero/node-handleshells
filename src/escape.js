module.exports = function escapeShell( str ) {
  if ( !str & str !== 0 )
    return ''

  if ( str.string )
    return str.string

  if ( Array.isArray( str ) ) {
    return str.map( escapeShell ).join(' ')
  }

  // Shamelessly stolen from
  // https://github.com/xxorax/node-shell-escape
  if (/[^\.A-Za-z0-9_\/:=-]/.test(str)) {
    str = "'"+str.replace(/'/g,"'\\''")+"'";
    str = str.replace(/^(?:'')+/g, '') // unduplicate single-quote at the beginning
      .replace(/\\'''/g, "\\'" ); // remove non-escaped single-quote if there are enclosed between 2 escaped
  }

  return str
}
