import _ from 'lodash';

const space = '  ';

const iter = (diff, subDepth = 0) => diff.map((node) => {
  const depth = subDepth + 1;
  const shortSpaceString = space.repeat(depth * 2 - 1);
  const mediumSpaceString = space.repeat(depth * 2);
  const longSpaceString = space.repeat(depth * 2 + 1);
  const stringify = (value) => {
    if (!_.isObject(value)) {
      return value;
    }
    const keys = Object.keys(value);
    const result = keys.map((key) => `${longSpaceString}${key}: ${value[key]}`);
    return `{\n  ${result.join('\n')}\n  ${shortSpaceString}}`;
  };
  switch (node.status) {
    case 'unchanged':
      return `${shortSpaceString}  ${node.name}: ${stringify(node.value)}`;
    case 'added':
      return `${shortSpaceString}+ ${node.name}: ${stringify(node.value)}`;
    case 'deleted':
      return `${shortSpaceString}- ${node.name}: ${stringify(node.value)}`;
    case 'changed':
      return `${shortSpaceString}+ ${node.name}: ${stringify(node.currentValue)}\n${shortSpaceString}- ${node.name}: ${stringify(node.previousValue)}`;
    case 'nested':
      return `${mediumSpaceString}${node.name}: {\n${iter(node.children, depth).join('\n')}\n${mediumSpaceString}}`;
    default:
      throw new Error(`Unknown node status: '${node.status}'!`);
  }
});

export default (diff) => `{\n${iter(diff).join('\n')}\n}`;
