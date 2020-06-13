import _ from 'lodash';

const space = '  ';

const iter = (diff, subDepth = 0) => diff.map((node) => {
  const depth = subDepth + 1;
  const stringify = (value) => {
    if (!_.isObject(value)) {
      return value;
    }
    const keys = Object.keys(value);
    const result = keys.map((key) => `${space.repeat(depth * 2 + 1)}${key}: ${value[key]}`);
    return `{\n  ${result.join('\n')}\n  ${space.repeat(depth * 2 - 1)}}`;
  };
  switch (node.status) {
    case 'unchanged':
      return `${space.repeat(depth * 2 - 1)}  ${node.name}: ${stringify(node.value)}`;
    case 'added':
      return `${space.repeat(depth * 2 - 1)}+ ${node.name}: ${stringify(node.value)}`;
    case 'deleted':
      return `${space.repeat(depth * 2 - 1)}- ${node.name}: ${stringify(node.value)}`;
    case 'changed':
      return `${space.repeat(depth * 2 - 1)}+ ${node.name}: ${stringify(node.currentValue)}\n${space.repeat(depth * 2 - 1)}- ${node.name}: ${stringify(node.previousValue)}`;
    case 'nested':
      return `${space.repeat(depth * 2)}${node.name}: {\n${iter(node.children, depth).join('\n')}\n${space.repeat(depth * 2)}}`;
    default:
      throw new Error(`Unknown node status: '${node.status}'!`);
  }
});

export default (diff) => `{\n${iter(diff).join('\n')}\n}`;
