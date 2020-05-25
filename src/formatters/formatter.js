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

const iter = (diff, spacesSubCount = 0) => diff.map((node) => {
  const add = (item, spacesCount) => {
    const stringify = (value) => {
      const keys = Object.keys(value);
      const result = keys.map((key) => `${space.repeat(spacesCount + 1)}${key}: ${value[key]}`);
      return `{\n  ${result.join('\n')}\n  ${space.repeat(spacesCount - 1)}}`;
    };
    return item.children
      ? [`${space.repeat(spacesCount)}${item.name}: {\n${iter(item.children, spacesCount).join('')}${space.repeat(spacesCount)}}\n`]
      : [item.status === 'changed'
        ? `${space.repeat(spacesCount - 1)}+ ${item.name}: ${typeof item.currentValue === 'object'
          ? stringify(item.currentValue)
          : item.currentValue}\n${space.repeat(spacesCount - 1)}- ${item.name}: ${typeof item.previousValue === 'object'
          ? stringify(item.previousValue)
          : item.previousValue}\n`
        : `${space.repeat(spacesCount - 1)}${getSign(item.status)}${item.name}: ${typeof item.value === 'object'
          ? stringify(item.value)
          : item.value}\n`];
  };
  const spacesCount = spacesSubCount + 2;
  return add(node, spacesCount);
});

export default (diff) => `{\n${iter(diff).join('')}}`;
