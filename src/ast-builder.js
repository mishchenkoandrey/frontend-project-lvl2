import _ from 'lodash';

const genAST = (data1, data2) => {
  const dataKeys = _.union(_.keys(data1), _.keys(data2));
  const add = (key) => {
    if (!_.has(data1, key)) {
      return { name: key, status: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { name: key, status: 'deleted', value: data1[key] };
    }
    if (data1[key] === data2[key]) {
      return { name: key, status: 'unchanged', value: data1[key] };
    }
    return (!_.isObject(data1[key]) || !_.isObject(data2[key]))
      ? {
        name: key, status: 'changed', previousValue: data1[key], currentValue: data2[key],
      }
      : { name: key, status: 'nested', children: genAST(data1[key], data2[key]) };
  };
  return dataKeys.map((key) => add(key));
};

export default genAST;
