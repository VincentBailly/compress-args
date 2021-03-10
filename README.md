# compress-args

Compress a list of command line arguments so we can reduce long commands to below the 8191 char limit on Windows.
The compression assumes that the tools being called is capable of doing curly-braces expansion.
The algorithm is not producing the optimal compression, but one that is simple to implement.

## Usage

```javascript
const { compressArgs } = require("compress-args");

compressArgs(["foo", "foo-bar", "baz"]);
// returns "{foo{,-bar},baz}"
```