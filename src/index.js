import fs from 'fs';

export default (pathToFile1, pathToFile2) => {
  const data1 = JSON.parse(fs.readFileSync(pathToFile1, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(pathToFile2, 'utf-8'));
  const data1keys = Object.keys(data1);
  const data2keys = Object.keys(data2);
  const dataKeys = Object.keys({ ...data1, ...data2 });
  const add = (acc, key) => {
    if (data1keys.includes(key) && data2keys.includes(key)) {
      return data1[key] === data2[key]
        ? [...acc, `    ${key}: ${data1[key]}`]
        : [...acc, `  + ${key}: ${data2[key]}`, `  + ${key}: ${data1[key]}`];
    }
    return data1keys.includes(key)
      ? [...acc, `  - ${key}: ${data1[key]}`]
      : [...acc, `  + ${key}: ${data2[key]}`];
  };
  const result = dataKeys.reduce(add, []);
  return `{\n${result.join('\n')}\n}`;
};
