import getData from './parsers.js';

const getParsedValue = (fileFormat, value) => {
  if (fileFormat === '.ini') {
    const iter = (subValue) => {
      if (typeof subValue === 'string') {
        return Number(subValue) ? Number(subValue) : subValue;
      }
      if (typeof subValue === 'number') {
        return value.toString();
      }
      if (typeof subValue === 'object') {
        const valueKeys = Object.keys(subValue);
        const add = (acc, key) => ({ ...acc, [key]: iter(subValue[key]) });
        return valueKeys.reduce(add, {});
      }
      return subValue;
    };
    return iter(value);
  }
  return value;
};

const iter = (data1, data2, fileFormat) => {
  const data1keys = Object.keys(data1);
  const data2keys = Object.keys(data2);
  const dataKeys = Object.keys({ ...data1, ...data2 });
  const add = (acc, key) => {
    if (data1keys.includes(key) && data2keys.includes(key)) {
      if (data1[key] === data2[key]) {
        return { ...acc, [key]: { value: data1[key] } };
      }
      return typeof data1[key] === 'object' && typeof data2[key] === 'object'
        ? { ...acc, [key]: { children: iter(data1[key], data2[key], fileFormat) } }
        : { ...acc, [key]: { status: 'changed', value: { previous: getParsedValue(fileFormat, data1[key]), current: getParsedValue(fileFormat, data2[key]) } } };
    }
    return data1keys.includes(key)
      ? { ...acc, [key]: { status: 'deleted', value: getParsedValue(fileFormat, data1[key]) } }
      : { ...acc, [key]: { status: 'added', value: getParsedValue(fileFormat, data2[key]) } };
  };
  return dataKeys.reduce(add, {});
};

export default (pathToFile1, pathToFile2) => {
  const [file1data, file1format] = getData(pathToFile1);
  const [file2data, file2format] = getData(pathToFile2);
  if (file1format === file2format) {
    return iter(file1data, file2data, file1format);
  }
  throw new Error('Mismatched file formats!');
};
