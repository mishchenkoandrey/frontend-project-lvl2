import genDiff from '../src/index';

const result = '{\n    common: {\n        setting1: Value 1\n      - setting2: 200\n      + setting3: {\n            key: value\n        }\n      - setting3: true\n        setting6: {\n            key: value\n          + ops: vops\n        }\n      + follow: false\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n    }\n    group1: {\n      + baz: bars\n      - baz: bas\n        foo: bar\n      + nest: str\n      - nest: {\n            key: value\n        }\n    }\n  - group2: {\n        abc: 12345\n    }\n  + group3: {\n        fee: 100500\n    }\n}';

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
