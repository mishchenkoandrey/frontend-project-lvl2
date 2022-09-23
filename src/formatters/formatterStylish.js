import _ from 'lodash';

const space = '  ';

const iter = (diff, subDepth = 0) => diff.map((node) => {
  const depth = subDepth + 1;
  const genSpaceString = (extraSpace = 0) => space.repeat(depth * 2 + extraSpace);
  const stringify = (value) => {
    if (!_.isObject(value)) {
      return value;
    }
    const keys = Object.keys(value);
    const result = keys.map((key) => `${genSpaceString(1)}${key}: ${value[key]}`);
    return `{\n  ${result.join('\n')}\n  ${genSpaceString(-1)}}`;
  };
  switch (node.status) {
    case 'unchanged':
      return `${genSpaceString(-1)}  ${node.name}: ${stringify(node.value)}`;
    case 'added':
      return `${genSpaceString(-1)}+ ${node.name}: ${stringify(node.value)}`;
    case 'deleted':
      return `${genSpaceString(-1)}- ${node.name}: ${stringify(node.value)}`;
    case 'changed':
      return `${genSpaceString(-1)}+ ${node.name}: ${stringify(node.currentValue)}\n${genSpaceString(-1)}- ${node.name}: ${stringify(node.previousValue)}`;
    case 'nested':
      return `${genSpaceString()}${node.name}: {\n${iter(node.children, depth).join('\n')}\n${genSpaceString()}}`;
    default:
      throw new Error(`Unknown node status: '${node.status}'!`);
  }
});

export default (diff) => `{\n${iter(diff).join('\n')}\n}`;
