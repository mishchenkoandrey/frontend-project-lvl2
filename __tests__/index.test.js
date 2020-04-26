import genDiff from '../src/index';

const result = '{\n    common: {\n        setting1: Value 1\n      - setting2: 200\n      + setting3: {\n            key: value\n        }\n      - setting3: true\n        setting6: {\n            key: value\n          + ops: vops\n        }\n      + follow: false\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n    }\n    group1: {\n      + baz: bars\n      - baz: bas\n        foo: bar\n      + nest: str\n      - nest: {\n            key: value\n        }\n    }\n  - group2: {\n        abc: 12345\n    }\n  + group3: {\n        fee: 100500\n    }\n}';

const plainResult = "Property 'common.setting2' was deleted\nProperty 'common.setting3' was changed from true to [complex value]\nProperty 'common.setting6.ops' was added with value: 'vops'\nProperty 'common.follow' was added with value: false\nProperty 'common.setting4' was added with value: 'blah blah'\nProperty 'common.setting5' was added with value: [complex value]\nProperty 'group1.baz' was changed from 'bas' to 'bars'\nProperty 'group1.nest' was changed from [complex value] to 'str'\nProperty 'group2' was deleted\nProperty 'group3' was added with value: [complex value]";

const files = [['before.json', 'after.json'], ['before.yml', 'after.yml'], ['before.ini', 'after.ini']];

describe("'genDiff' utility", () => {
  test.each(files)(
    'given %p and %p',
    (before, after) => {
      expect(genDiff(`fixtures/${before}`, `fixtures/${after}`))
        .toBe(result);
    },
  );
});

describe("'genDiff plain' utility", () => {
  test.each(files)(
    'given %p and %p',
    (before, after) => {
      expect(genDiff(`fixtures/${before}`, `fixtures/${after}`, 'plain'))
        .toBe(plainResult);
    },
  );
});
