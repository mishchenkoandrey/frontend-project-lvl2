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
    case 'deleted':
      return '- ';
    default:
      return '  ';
  }
};

const formatter = (diff) => {
  const diffKeys = Object.keys(diff);
  const add = (acc, key) => {
    spacesCount += 2;
    const result = diff[key].children
      ? [...acc, `${space.repeat(spacesCount)}${key}: ${formatter(diff[key].children)}\n`]
      : [...acc, diff[key].status === 'changed'
        ? `${space.repeat(spacesCount - 1)}+ ${key}: ${typeof diff[key].value.current === 'object'
          ? stringify(diff[key].value.current)
          : diff[key].value.current}\n${space.repeat(spacesCount - 1)}- ${key}: ${typeof diff[key].value.previous === 'object'
          ? stringify(diff[key].value.previous)
          : diff[key].value.previous}\n`
        : `${space.repeat(spacesCount - 1)}${getSign(diff[key].status)}${key}: ${typeof diff[key].value === 'object'
          ? stringify(diff[key].value)
          : diff[key].value}\n`];
    spacesCount -= 2;
    return result;
  };
  return `{\n${diffKeys.reduce(add, []).join('')}${space.repeat(spacesCount)}}`;
};

export default formatter;
