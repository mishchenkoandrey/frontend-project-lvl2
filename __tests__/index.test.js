import fs from 'fs';

import genDiff from '../src/index';

const pairsOfFilenames = [['before.json', 'after.json'], ['before.yml', 'after.yml'], ['before.ini', 'after.ini']];

const runTests = (resultFilename, outputFormat) => {
  test.each(pairsOfFilenames)(
    'given %p and %p',
    (before, after) => {
      expect(genDiff(`fixtures/${before}`, `fixtures/${after}`, outputFormat))
        .toBe(fs.readFileSync(`fixtures/${resultFilename}`, 'utf-8'));
    },
  );
};

describe("'genDiff' utility", () => {
  runTests('result');
});

describe("'genDiff plain' utility", () => {
  runTests('plain-result', 'plain');
});

describe("'genDiff JSON' utility", () => {
  runTests('result.json', 'json');
});
