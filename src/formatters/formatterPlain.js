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

const iter = (diff, keySubAcc = []) => diff.flatMap((node) => {
  const add = (item, keyAcc) => {
    if (item.status === 'changed') {
      return `Property '${keyAcc.join('.')}' was changed from ${formatValue(item.previousValue)} to ${formatValue(item.currentValue)}`;
    }
    if (item.status === 'added') {
      return `Property '${keyAcc.join('.')}' was added with value: ${formatValue(item.value)}`;
    }
    if (item.status === 'deleted') {
      return `Property '${keyAcc.join('.')}' was deleted`;
    }
    if (item.children) {
      return `${iter(item.children, keyAcc).join('\n')}`;
    }
    return [];
  };
  const keyAcc = keySubAcc ? [...keySubAcc, node.name] : node.name;
  return add(node, keyAcc);
});

export default (diff) => `${iter(diff).join('\n')}`;
