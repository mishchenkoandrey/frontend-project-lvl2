const keyAcc = [];

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

const outputToPlain = (diff) => {
  const add = (acc, item) => {
    if (item.status === 'changed') {
      return [...acc, `Property '${[...keyAcc, item.name].join('.')}' was changed from ${formatValue(item.previousValue)} to ${formatValue(item.currentValue)}`];
    }
    if (item.status === 'added') {
      return [...acc, `Property '${[...keyAcc, item.name].join('.')}' was added with value: ${formatValue(item.value)}`];
    }
    if (item.status === 'deleted') {
      return [...acc, `Property '${[...keyAcc, item.name].join('.')}' was deleted`];
    }
    if (item.children) {
      keyAcc.push(item.name);
      const result = [...acc, `${outputToPlain(item.children)}`];
      keyAcc.pop();
      return result;
    }
    return [...acc];
  };
  return `${diff.reduce(add, []).join('\n')}`;
};

export default outputToPlain;
