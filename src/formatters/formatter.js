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

const iter = (diff, subDepth = 0) => diff.map((node) => {
  const add = (item, depth) => {
    const stringify = (value) => {
      const keys = Object.keys(value);
      const result = keys.map((key) => `${space.repeat(depth + 1)}${key}: ${value[key]}`);
      return `{\n  ${result.join('\n')}\n  ${space.repeat(depth - 1)}}`;
    };
    if (item.children) {
      return [`${space.repeat(depth)}${item.name}: {\n${iter(item.children, depth).join('')}${space.repeat(depth)}}\n`];
    }
    if (item.status === 'changed') {
      return [`${space.repeat(depth - 1)}+ ${item.name}: ${typeof item.currentValue === 'object'
        ? stringify(item.currentValue)
        : item.currentValue}\n${space.repeat(depth - 1)}- ${item.name}: ${typeof item.previousValue === 'object'
        ? stringify(item.previousValue)
        : item.previousValue}\n`];
    }
    return [`${space.repeat(depth - 1)}${getSign(item.status)}${item.name}: ${typeof item.value === 'object'
      ? stringify(item.value)
      : item.value}\n`];
  };
  const depth = subDepth + 2;
  return add(node, depth);
});

export default (diff) => `{\n${iter(diff).join('')}}`;
