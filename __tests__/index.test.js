import genDiff from '../src/index';

const result = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';

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
