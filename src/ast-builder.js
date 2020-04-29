import parse, { getParsedValue } from './parsers.js';

export default (pathToFile1, pathToFile2) => {
  const dataFile1 = parse(pathToFile1);
  const dataFile2 = parse(pathToFile2);
  const iter = (data1, data2) => {
    const data1keys = Object.keys(data1);
    const data2keys = Object.keys(data2);
    const dataKeys = Object.keys({ ...data1, ...data2 });
    const add = (acc, key) => {
      if (data1keys.includes(key) && data2keys.includes(key)) {
        if (data1[key] === data2[key]) {
          return { ...acc, [key]: { value: data1[key] } };
        }
        return typeof data1[key] === 'object' && typeof data2[key] === 'object'
          ? { ...acc, [key]: { children: iter(data1[key], data2[key]) } }
          : { ...acc, [key]: { status: 'changed', value: { previous: getParsedValue(pathToFile1, data1[key]), current: getParsedValue(pathToFile2, data2[key]) } } };
      }
      return data1keys.includes(key)
        ? { ...acc, [key]: { status: 'deleted', value: getParsedValue(pathToFile1, data1[key]) } }
        : { ...acc, [key]: { status: 'added', value: getParsedValue(pathToFile2, data2[key]) } };
    };
    return dataKeys.reduce(add, {});
  };
  return iter(dataFile1, dataFile2);
};
