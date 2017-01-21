Allows the building and running of shell commands using handlebars templates.

# Examples

## ffprobe
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

## compile

## exec

## Template Helpers

### args

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

``` js
const dir = 'bar'
    , file = 'foo.txt'

assert.equal(
  handleshells.compile('{{ join "/tmp" dir file }}', { dir, file } ),
  "/tmp/bar/foo.txt"
)
```
