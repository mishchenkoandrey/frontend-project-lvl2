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

const output = (diff) => {
  const add = (acc, item) => {
    spacesCount += 2;
    const result = item.children
      ? [...acc, `${space.repeat(spacesCount)}${item.name}: ${output(item.children)}\n`]
      : [...acc, item.status === 'changed'
        ? `${space.repeat(spacesCount - 1)}+ ${item.name}: ${typeof item.currentValue === 'object'
          ? stringify(item.currentValue)
          : item.currentValue}\n${space.repeat(spacesCount - 1)}- ${item.name}: ${typeof item.previousValue === 'object'
          ? stringify(item.previousValue)
          : item.previousValue}\n`
        : `${space.repeat(spacesCount - 1)}${getSign(item.status)}${item.name}: ${typeof item.value === 'object'
          ? stringify(item.value)
          : item.value}\n`];
    spacesCount -= 2;
    return result;
  };
  return `{\n${diff.reduce(add, []).join('')}${space.repeat(spacesCount)}}`;
};

export default output;
