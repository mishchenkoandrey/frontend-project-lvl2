import genDiff from '../src/index';

const result = `{
    common: {
        setting1: Value 1
      - setting2: 200
      + setting3: {
            key: value
        }
      - setting3: true
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
      + nest: str
      - nest: {
            key: value
        }
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

const plainResult = `Property 'common.setting2' was deleted
Property 'common.setting3' was changed from true to [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest' was changed from [complex value] to 'str'
Property 'group2' was deleted
Property 'group3' was added with value: [complex value]`;

const JSONresult = `{
  "common": {
    "children": {
      "setting1": {
        "value": "Value 1"
      },
      "setting2": {
        "status": "deleted",
        "value": 200
      },
      "setting3": {
        "status": "changed",
        "value": {
          "previous": true,
          "current": {
            "key": "value"
          }
        }
      },
      "setting6": {
        "children": {
          "key": {
            "value": "value"
          },
          "ops": {
            "status": "added",
            "value": "vops"
          }
        }
      },
      "follow": {
        "status": "added",
        "value": false
      },
      "setting4": {
        "status": "added",
        "value": "blah blah"
      },
      "setting5": {
        "status": "added",
        "value": {
          "key5": "value5"
        }
      }
    }
  },
  "group1": {
    "children": {
      "baz": {
        "status": "changed",
        "value": {
          "previous": "bas",
          "current": "bars"
        }
      },
      "foo": {
        "value": "bar"
      },
      "nest": {
        "status": "changed",
        "value": {
          "previous": {
            "key": "value"
          },
          "current": "str"
        }
      }
    }
  },
  "group2": {
    "status": "deleted",
    "value": {
      "abc": 12345
    }
  },
  "group3": {
    "status": "added",
    "value": {
      "fee": 100500
    }
  }
}`;

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

describe("'genDiff JSON' utility", () => {
  test.each(files)(
    'given %p and %p',
    (before, after) => {
      expect(genDiff(`fixtures/${before}`, `fixtures/${after}`, 'json'))
        .toBe(JSONresult);
    },
  );
});
