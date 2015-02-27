#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
