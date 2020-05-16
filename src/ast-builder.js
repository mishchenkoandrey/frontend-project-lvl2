import _ from 'lodash';

import { getParsedValue } from './parsers.js';

const genAST = (data1, data2, fileFormat) => {
  const dataKeys = _.union(_.keys(data1), _.keys(data2));
  const add = (acc, key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        return [...acc, { name: key, value: data1[key] }];
      }
      return typeof data1[key] === 'object' && typeof data2[key] === 'object'
        ? [...acc, { name: key, children: genAST(data1[key], data2[key], fileFormat) }]
        : [...acc, { name: key, status: 'changed', previousValue: getParsedValue(fileFormat, data1[key]), currentValue: getParsedValue(fileFormat, data2[key]) }];
    }
    return _.has(data1, key)
      ? [...acc, { name: key, status: 'deleted', value: getParsedValue(fileFormat, data1[key]) }]
      : [...acc, { name: key, status: 'added', value: getParsedValue(fileFormat, data2[key]) }];
  };
  return dataKeys.reduce(add, []);
};

export default genAST;
