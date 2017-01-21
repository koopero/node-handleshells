#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
/*
  Simple test shim which takes all supplied arguments
  and outputs them as JSON.
*/
var argv = require('minimist')(process.argv.slice(2));
process.stdout.write( JSON.stringify( argv ) );
