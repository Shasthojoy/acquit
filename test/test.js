var assert = require('assert');
var fs = require('fs');
var acquit = require('../lib');

describe('Basic functionality', function() {
  it('can provide basic results', function() {
    var contents =
      '/**\n' + 
      ' * A `Model` is a convenience wrapper around objects stored in a\n' +
      ' * collection\n' +
      ' */\n' +
      'describe(\'Model\', function() {\n' +
      '  /**\n' +
      '   * Model **should** be able to save stuff\n' +
      '   **/\n' +
      '  it(\'can save\', function() {\n' +
      '    assert.ok(1);\n' +
      '  });\n' +
      '});';

    var ret = acquit.parse(contents);

    //console.log(ret);
    assert.equal(1, ret.length);
    assert.equal('describe', ret[0].type);
    assert.equal(1, ret[0].comments.length);
    assert.ok(ret[0].comments[0].indexOf('`Model`') != -1);
    assert.equal(1, ret[0].blocks.length);
    assert.equal('it', ret[0].blocks[0].type);
    assert.equal(1, ret[0].blocks[0].comments.length);
    assert.ok(ret[0].blocks[0].code);
  });
});

describe('ES6', function() {
  it('can parse ES6 yield keywords', function() {
    var contents =
      'describe(\'ES6\', function() {\n' +
      '  // ES6 has a `yield` keyword\n' +
      '  it(\'should be able to yield\', function() {\n' +
      '    co(function*() {\n' +
      '      yield 1;\n' +
      '    })();\n' +
      '  });\n' +
      '});';

    var ret = acquit.parse(contents);

    assert.equal(1, ret.length);
    assert.equal('describe', ret[0].type);
    assert.equal(0, ret[0].comments.length);
    assert.equal(1, ret[0].blocks.length);
    assert.equal('it', ret[0].blocks[0].type);
    assert.equal(1, ret[0].blocks[0].comments.length);
    assert.ok(ret[0].blocks[0].code);

  });
});

describe('The `trimEachLine()` function', function() {
  it('strips out whitespace and asterisks in multiline comments', function() {
    var str = '  * This comment looks like a \n' +
      '  * parsed JSdoc-style comment';

    assert.equal(acquit.trimEachLine(str), 'This comment looks like a\n' +
      'parsed JSdoc-style comment');
  });
});
