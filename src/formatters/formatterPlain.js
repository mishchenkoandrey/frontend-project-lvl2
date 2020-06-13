const formatValue = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const iter = (diff, keySubAcc = []) => diff
  .filter((node) => node.status !== 'unchanged')
  .flatMap((node) => {
    const keyAcc = keySubAcc ? [...keySubAcc, node.name] : node.name;
    switch (node.status) {
      case 'changed':
        return `Property '${keyAcc.join('.')}' was changed from ${formatValue(node.previousValue)} to ${formatValue(node.currentValue)}`;
      case 'added':
        return `Property '${keyAcc.join('.')}' was added with value: ${formatValue(node.value)}`;
      case 'deleted':
        return `Property '${keyAcc.join('.')}' was deleted`;
      case 'nested':
        return `${iter(node.children, keyAcc).join('\n')}`;
      default:
        throw new Error(`Unknown node status: '${node.status}'!`);
    }
  });

export default (diff) => `${iter(diff).join('\n')}`;
