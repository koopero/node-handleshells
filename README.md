`handleshells` allows for easy calling of command line utilities by processing
command line arguments with [handlebars](https://www.npmjs.com/package/handlebars).
It provides:

- Automatic escaping
- Promise-based execution
- Useful template helpers

# Example

The following example uses [ffprobe](https://ffmpeg.org/ffprobe.html) to extract
metadata from a video file.

``` js
const handleshells = require('handleshells')

// A source video file. Notice that the path contains
// a space, which will be automatically escaped.
const videoFile = '/Video Files/video.mov'

// The ffprobe command line. {{ videoFile }} will be substituted.
const command = 'ffprobe -v quiet -print_format json -show_streams {{ videoFile }}'

// Run the command. A Promise will be returned.
handleshells.exec( command, { videoFile } )
  .then( ( result ) => {
    // Since the command returns JSON to stdout,
    // we can access the data directly.
    assert.isObject( result.data )
  } )
```

# API

## Functions

### compile
Compile a command and return the escaped command line.

#### Example
``` js
assert.equal(
  handleshells.compile( 'touch {{ file }}', { file: 'foo.txt' } ),
  'touch foo.txt'
)
```

### exec
Compiles and then executes a command.
#### Result
- **pid** : The process id of spawned command.
- **exitCode** : The status of the command's exit.
- **stdout** : The output of the command, usually String.
- **stderr** : The errors from the command, usually String.
- **data** : `stdout` as JSON, if applicable.
- **dataerr** : `stderr` as JSON, if applicable.

#### Example
``` js
handleshells.exec( 'echo {{ text }}', { text: 'Hello, world!'} )
  .then( ( result ) => {
    assert.equal( result.stdout, 'Hello, world!\n' )
  } )
```


## Template Helpers

### args

Spread objects as command line options.

``` js
const options = {
  a: 'foo',
  bar: 'baz qux'
}
assert.equal(
  handleshells.compile('{{ args options }}', { options } ),
  "-a foo --bar 'baz qux'"
)
```

### join

Join strings together into paths.

``` js
const dir = 'bar'
    , file = 'foo.txt'

assert.equal(
  handleshells.compile('{{ join "/tmp" dir file }}', { dir, file } ),
  "/tmp/bar/foo.txt"
)
```
