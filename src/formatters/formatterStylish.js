import _ from 'lodash';

const space = '  ';

const iter = (diff, subDepth = 0) => diff.map((node) => {
  const depth = subDepth + 1;
  const stringify = (value) => {
    if (_.isObject(value)) {
      const keys = Object.keys(value);
      const result = keys.map((key) => `${space.repeat(depth * 2 + 1)}${key}: ${value[key]}`);
      return `{\n  ${result.join('\n')}\n  ${space.repeat(depth * 2 - 1)}}`;
    }
    return value;
  };
  switch (node.status) {
    case 'unchanged':
      return [`${space.repeat(depth * 2 - 1)}  ${node.name}: ${stringify(node.value)}\n`];
    case 'added':
      return [`${space.repeat(depth * 2 - 1)}+ ${node.name}: ${stringify(node.value)}\n`];
    case 'deleted':
      return [`${space.repeat(depth * 2 - 1)}- ${node.name}: ${stringify(node.value)}\n`];
    case 'changed':
      return [`${space.repeat(depth * 2 - 1)}+ ${node.name}: ${stringify(node.currentValue)}\n${space.repeat(depth * 2 - 1)}- ${node.name}: ${stringify(node.previousValue)}\n`];
    default:
      return [`${space.repeat(depth * 2)}${node.name}: {\n${iter(node.children, depth).join('')}${space.repeat(depth * 2)}}\n`];
  }
});

export default (diff) => `{\n${iter(diff).join('')}}`;
