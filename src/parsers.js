import path from 'path';

import fs from 'fs';

import yaml from 'js-yaml';

import ini from 'ini';

export default (pathToFile) => {
  const fileFormat = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile, 'utf-8');
  switch (fileFormat) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error(`Unknown format: '${fileFormat}'!`);
  }
};

const getFileFormat = (pathToFile) => path.extname(pathToFile);

const getParsedValue = (pathToFile, value) => {
  if (getFileFormat(pathToFile) === '.ini') {
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

export { getParsedValue };
