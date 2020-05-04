import fs from 'fs';

import genDiff from '../src/index';

const pairsOfFilenames = [['before.json', 'after.json'], ['before.yml', 'after.yml'], ['before.ini', 'after.ini']];

describe("'genDiff' utility", () => {
  test.each(pairsOfFilenames)(
    'given %p and %p',
    (before, after) => {
      expect(genDiff(`fixtures/${before}`, `fixtures/${after}`))
        .toBe(fs.readFileSync('fixtures/result', 'utf-8'));
    },
  );
});

describe("'genDiff plain' utility", () => {
  test.each(pairsOfFilenames)(
    'given %p and %p',
    (before, after) => {
      expect(genDiff(`fixtures/${before}`, `fixtures/${after}`, 'plain'))
        .toBe(fs.readFileSync('fixtures/plain-result', 'utf-8'));
    },
  );
});

describe("'genDiff JSON' utility", () => {
  test.each(pairsOfFilenames)(
    'given %p and %p',
    (before, after) => {
      expect(genDiff(`fixtures/${before}`, `fixtures/${after}`, 'json'))
        .toBe(fs.readFileSync('fixtures/result.json', 'utf-8'));
    },
  );
});
