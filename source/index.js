var markdown = require('markdown-it')();

var isCodeToken = (function() {
  var codeTokenTypes = ['fence', 'code_block'];
  var codeSyntaxStrings = ['js', 'javascript'];

  return function(token) {
    return (
      codeTokenTypes.indexOf(token.type) > -1 &&
      (
        token.info === '' ||
        codeSyntaxStrings.indexOf(token.info.trim()) > -1
      )
    );
  };
})();

module.exports = (function() {
  var replacements = [
    [
      // throws
      /(.+); *\n?\/\/ *throws *\n/g,
      'assert.throws(function(){$1});\n'
    ],
    [
      // throws Error
      /(.+); *\n?\/\/ *throws *(.+)\n/g,
      'assert.throws(function(){$1}, $2);\n'
    ],
    [
      // === x
      /(.+); *\n?\/\/ *=== *(.+)\n/g,
      'assert.strictEqual($1, $2);\n'
    ],
    [
      // == x
      /(.+); *\n?\/\/ *== *(.+)\n/g,
      'assert.equal($1, $2);\n'
    ],
    [
      // trim extra newlines
      /\n+/g,
      '\n'
    ]
  ];

  var preamble = 'var assert = require(\'assert\');\n';

  return function(markdownString) {
    return (
      preamble +
      replacements.reduce(function(code, replacement) {
        return String.prototype.replace.apply(code, replacement);
      }, (
        markdown
          .parse(markdownString + '\n')
          .reduce(function(code, token) {
            return isCodeToken(token) ? code + token.content : code;
          }, '')
      ))
    );
  };
})();

module.exports.version = '0.1.0';
