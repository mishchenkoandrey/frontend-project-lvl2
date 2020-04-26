let spacesCount = 0;

const space = '  ';

const getSign = (sign) => {
  switch (sign) {
    case 'added':
      return '+ ';
    case 'deleted':
      return '- ';
    default:
      return '  ';
  }
};

const stringify = (value) => {
  const keys = Object.keys(value);
  const result = keys.map((key) => `${space.repeat(spacesCount + 1)}${key}: ${value[key]}`);
  return `{\n  ${result.join('\n')}\n  ${space.repeat(spacesCount - 1)}}`;
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

export default formatter;
