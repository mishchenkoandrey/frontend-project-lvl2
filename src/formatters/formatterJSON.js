const prepareToJSONstringify = (diff) => {
  const add = (acc, item) => {
    if (item.status === 'changed') {
      return { ...acc, [item.name]: { status: 'changed', value: { previous: item.previousValue, current: item.currentValue } } };
    }
    if (item.status === 'added') {
      return { ...acc, [item.name]: { status: 'added', value: item.value } };
    }
    if (item.status === 'deleted') {
      return { ...acc, [item.name]: { status: 'deleted', value: item.value } };
    }
    if (item.children) {
      return { ...acc, [item.name]: { children: prepareToJSONstringify(item.children) } };
    }
    return { ...acc, [item.name]: { value: item.value } };
  };
  return diff.reduce(add, {});
};

export default (diff) => JSON.stringify(prepareToJSONstringify(diff), null, '  ');
