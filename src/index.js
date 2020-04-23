import parse from './parsers.js';

const space = '  ';

let spacesCount = 0;

const stringify = (value) => {
  const keys = Object.keys(value);
  const result = keys.map((key) => `${space.repeat(spacesCount + 1)}${key}: ${value[key]}`);
  return `{\n  ${result.join('\n')}\n  ${space.repeat(spacesCount - 1)}}`;
};

const getSign = (sign) => {
  switch (sign) {
    case 'added':
      return '+ ';
    case 'removed':
      return '- ';
    default:
      return '  ';
  }
};

const formatter = (diff) => {
  const add = (acc, item) => {
    spacesCount += 2;
    const result = Array.isArray(item[1])
      ? [...acc, `${space.repeat(spacesCount - 1)}${getSign(item[2])}${item[0]}: ${formatter(item[1])}\n`]
      : [...acc, `${space.repeat(spacesCount - 1)}${getSign(item[2])}${item[0]}: ${typeof item[1] === 'object' ? stringify(item[1]) : item[1]}\n`];
    spacesCount -= 2;
    return result;
  };
  return `{\n${diff.reduce(add, []).join('')}${space.repeat(spacesCount)}}`;
};

const genDiff = (pathToFile1, pathToFile2) => {
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
          : [...acc, [key, data2[key], 'added'], [key, data1[key], 'removed']];
      }
      return data1keys.includes(key)
        ? [...acc, [key, data1[key], 'removed']]
        : [...acc, [key, data2[key], 'added']];
    };
    return dataKeys.reduce(add, []);
  };
  return formatter(iter(dataFile1, dataFile2));
};

module.exports = genDiff;

export default genDiff;
