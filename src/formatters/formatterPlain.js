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
  const add = (acc, item, index, items) => {
    if (items[index + 1] && items[index][0] === items[index + 1][0]) {
      return [...acc, `Property '${[...keyAcc, item[0]].join('.')}' was changed from ${formatValue(items[index + 1][1])} to ${formatValue(items[index][1])}`];
    }
    if (item[2]
    && (!items[index - 1] || (items[index - 1] && items[index][0] !== items[index - 1][0]))) {
      return [...acc, `${item[2] === 'added' ? `Property '${[...keyAcc, item[0]].join('.')}' was added with value: ${formatValue(item[1])}` : `Property '${[...keyAcc, item[0]].join('.')}' was deleted`}`];
    }
    if (Array.isArray(item[1])) {
      keyAcc.push(item[0]);
      const result = [...acc, `${formatterPlain(item[1])}`];
      keyAcc.pop();
      return result;
    }
    return [...acc];
  };
  return `${diff.reduce(add, []).join('\n')}`;
};

export default formatterPlain;
