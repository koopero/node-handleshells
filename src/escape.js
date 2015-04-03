module.exports = function escapeShell( str ) {
  if ( str.string )
    return str.string;
  
  return require('shell-escape')([ str ]);
}
