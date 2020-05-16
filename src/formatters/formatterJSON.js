const prepareToJSONstringify = (diff) => {
  const add = (acc, item) => {
    if (item.children) {
      return { ...acc, [item.name]: { children: prepareToJSONstringify(item.children) } };
    }
    if (item.status === 'changed') {
      return { ...acc, [item.name]: { status: 'changed', value: { previous: item.previousValue, current: item.currentValue } } };
    }
    return { ...acc, [item.name]: { status: item.status, value: item.value } };
  };
  return diff.reduce(add, {});
};

export default (diff) => JSON.stringify(prepareToJSONstringify(diff), null, '  ');
