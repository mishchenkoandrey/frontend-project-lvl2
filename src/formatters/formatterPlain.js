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

const formatterPlain = (diff) => {
  const diffKeys = Object.keys(diff);
  const add = (acc, key) => {
    if (diff[key].status === 'changed') {
      return [...acc, `Property '${[...keyAcc, [key]].join('.')}' was changed from ${formatValue(diff[key].value.previous)} to ${formatValue(diff[key].value.current)}`];
    }
    if (diff[key].status === 'added') {
      return [...acc, `Property '${[...keyAcc, [key]].join('.')}' was added with value: ${formatValue(diff[key].value)}`];
    }
    if (diff[key].status === 'deleted') {
      return [...acc, `Property '${[...keyAcc, [key]].join('.')}' was deleted`];
    }
    if (diff[key].children) {
      keyAcc.push([key]);
      const result = [...acc, `${formatterPlain(diff[key].children)}`];
      keyAcc.pop();
      return result;
    }
    return [...acc];
  };
  return `${diffKeys.reduce(add, []).join('\n')}`;
};

export default formatterPlain;
