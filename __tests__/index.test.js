import genDiff from '../src/index';

test('compare before.json and after.json', () => {
  expect(genDiff('fixtures/before.json', 'fixtures/after.json'))
    .toBe('{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}');
});

test('compare before.yml and after.yml', () => {
  expect(genDiff('fixtures/before.yml', 'fixtures/after.yml'))
    .toBe('{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}');
});
