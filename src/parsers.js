import yaml from 'js-yaml';

import ini from 'ini';

export default (fileFormat, fileData) => {
  switch (fileFormat) {
    case '.json':
      return JSON.parse(fileData);
    case '.yml':
      return yaml.safeLoad(fileData);
    case '.ini':
      return ini.parse(fileData);
    default:
      throw new Error(`Unknown format: '${fileFormat}'!`);
  }
};

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

export { getParsedValue };
