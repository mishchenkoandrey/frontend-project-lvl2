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
  const depth = subDepth + 1;
  const stringify = (value) => {
    const keys = Object.keys(value);
    const result = keys.map((key) => `${space.repeat(depth * 2 + 1)}${key}: ${value[key]}`);
    return `{\n  ${result.join('\n')}\n  ${space.repeat(depth * 2 - 1)}}`;
  };
  switch (node.status) {
    case undefined:
      return [`${space.repeat(depth * 2)}${node.name}: {\n${iter(node.children, depth).join('')}${space.repeat(depth * 2)}}\n`];
    case 'changed':
      return [`${space.repeat(depth * 2 - 1)}+ ${node.name}: ${typeof node.currentValue === 'object'
        ? stringify(node.currentValue)
        : node.currentValue}\n${space.repeat(depth * 2 - 1)}- ${node.name}: ${typeof node.previousValue === 'object'
        ? stringify(node.previousValue)
        : node.previousValue}\n`];
    default:
      return [`${space.repeat(depth * 2 - 1)}${getSign(node.status)}${node.name}: ${typeof node.value === 'object'
        ? stringify(node.value)
        : node.value}\n`];
  }
});

export default (diff) => `{\n${iter(diff).join('')}}`;
