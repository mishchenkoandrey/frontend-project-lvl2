import parse from './parsers.js';

import formatter from './formatters/formatter.js';

import formatterPlain from './formatters/formatterPlain.js';

const genDiff = (pathToFile1, pathToFile2, format) => {
  const dataFile1 = parse(pathToFile1);
  const dataFile2 = parse(pathToFile2);
  const iter = (data1, data2) => {
    const data1keys = Object.keys(data1);
    const data2keys = Object.keys(data2);
    const dataKeys = Object.keys({ ...data1, ...data2 });
    const add = (acc, key) => {
      if (data1keys.includes(key) && data2keys.includes(key)) {
        if (data1[key] === data2[key]) {
          return [...acc, [key, data1[key]]];
        }
        return typeof data1[key] === 'object' && typeof data2[key] === 'object'
          ? [...acc, [key, iter(data1[key], data2[key])]]
          : [...acc, [key, data2[key], 'added'], [key, data1[key], 'deleted']];
      }
      return data1keys.includes(key)
        ? [...acc, [key, data1[key], 'deleted']]
        : [...acc, [key, data2[key], 'added']];
    };
    return dataKeys.reduce(add, []);
  };
  return format === 'plain' ? formatterPlain(iter(dataFile1, dataFile2)) : formatter(iter(dataFile1, dataFile2));
};

module.exports = genDiff;

export default genDiff;
