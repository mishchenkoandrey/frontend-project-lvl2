import _ from 'lodash';

import yaml from 'js-yaml';

import ini from 'ini';

const getParsedValueOfINI = (data) => {
  const add = (acc, key) => {
    switch (typeof data[key]) {
      case 'string':
        return Number(data[key])
          ? { ...acc, [key]: Number(data[key]) }
          : { ...acc, [key]: data[key] };
      case 'number':
        return { ...acc, [key]: data[key].toString() };
      case 'object':
        return { ...acc, [key]: getParsedValueOfINI(data[key]) };
      default:
        return { ...acc, [key]: data[key] };
    }
  };
  return _.keys(data).reduce(add, {});
};

export default (extension, data) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return getParsedValueOfINI(ini.parse(data));
    default:
      throw new Error(`Unsupported file format: '${extension}'!`);
  }
};
