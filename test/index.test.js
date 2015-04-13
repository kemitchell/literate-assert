/* jshint mocha: true */
var expect = require('chai').expect;
var assertREADME = require('..');

var preamble = 'var assert = require(\'assert\');\n';

describe('literate-assertions', function() {
  it('exports a function', function() {
    expect(assertREADME).to.be.a('function');
  });

  it('converts commented code to assertions', function() {
    expect(
      assertREADME('    10; // === 10')
    ).to.equal(preamble + 'assert.strictEqual(10, 10);\n');
  });

  it('converts commented code in fences to assertions', function() {
    expect(
      assertREADME(
        '``` js\n' +
        '10; // === 10\n' +
        '```'
      )
    ).to.equal(preamble + 'assert.strictEqual(10, 10);\n');
  });

  it('converts \'==\' to assert.equal', function() {
    expect(
      assertREADME('    10; // == 10')
    ).to.equal(preamble + 'assert.equal(10, 10);\n');
  });

  it('converts \'===\' to assert.strictEqual', function() {
    expect(
      assertREADME('    10; // === 10')
    ).to.equal(preamble + 'assert.strictEqual(10, 10);\n');
  });

  it('converts \'throws\' to assert.throws', function() {
    expect(
      assertREADME(
        '    throw new Error(); // throws'
      )
    ).to.equal(
      preamble +
      'assert.throws(function(){throw new Error()});\n'
    );
  });

  it('converts \'throws Type\' to assert.throws(, Type)', function() {
    expect(
      assertREADME(
        '    throw new Error(); // throws Error'
      )
    ).to.equal(
      preamble +
      'assert.throws(function(){throw new Error()}, Error);\n'
    );
  });
});
