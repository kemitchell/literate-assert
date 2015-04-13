literate-assertions
===================

[![NPM version](https://img.shields.io/npm/v/literate-assertions.svg)](https://www.npmjs.com/package/literate-assertions)
[![build status](https://img.shields.io/travis/kemitchell/literate-assertions.js.svg)](http://travis-ci.org/kemitchell/literate-assertions.js)

Translate Markdown code examples into assertions.

For example:

    Some text leading up to your code examples.

        var x = 'a string';

        x; // === 'a string'

    Assertion comments can also appear on subsequent lines.

        x + '';
        // === 'a string'

    Fenced code blocks work, too.

    ```javascript
    x.length > 0; // === true
    ```

    "javascript" and "js" syntax blocks will be translated.

    ```js
    throw new Error(); // throws Error
    ```

    As will blocks without specified syntax.

    ```
    // The following will fail.

    x === 'another string'; // == true
    ```

    Markdown business as usual all around.

The npm module installs a command-line script called `literate-assertions`, which reads from `/dev/stdin` and writes to `/dev/stdout`:

```none
$ literate-assertions < example_above.md
var assert = require('assert');
var x = 'a string';
assert.strictEqual(x, 'a string');
assert.strictEqual(x + '', 'a string');
assert.strictEqual(x.length > 0, true);
assert.throws(function(){throw new Error()}, Error);
// The following will fail.
assert.equal(x === 'another string', true);
```

You might use it in `package.json` for lightweight testing:

```json
{
  "devDependencies": {
    "literate-assertions": "*"
  },
  "scripts": {
    "test": "README.md < literate-assertions | sed 's!your-module-name!./!g | node"
  }
}
```

The module exports a single translation function:

```javascript
var assertions = require('literate-assertions');

assertions(
  'An obvious example:\n' +
  '    10 + 10; // === 20'
);
```
