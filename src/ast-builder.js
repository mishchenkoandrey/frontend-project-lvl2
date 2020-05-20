import _ from 'lodash';

const genAST = (data1, data2) => {
  const dataKeys = _.union(_.keys(data1), _.keys(data2));
  const add = (key, acc = []) => {
    if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
      return [...acc, { name: key, value: data1[key] }];
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      return typeof data1[key] === 'object' && typeof data2[key] === 'object'
        ? [...acc, { name: key, children: genAST(data1[key], data2[key]) }]
        : [...acc, {
          name: key, status: 'changed', previousValue: data1[key], currentValue: data2[key],
        }];
    }
    return _.has(data1, key)
      ? [...acc, { name: key, status: 'deleted', value: data1[key] }]
      : [...acc, { name: key, status: 'added', value: data2[key] }];
  };
  return dataKeys.flatMap((key) => add(key));
};

export default genAST;
