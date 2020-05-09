import path from 'path';

import fs from 'fs';

import yaml from 'js-yaml';

import ini from 'ini';

const parse = (fileFormat, fileData) => {
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

export default (pathToFile) => {
  const fileFormat = path.extname(pathToFile);
  const fileData = fs.readFileSync(pathToFile, 'utf-8');
  const parsedFileData = parse(fileFormat, fileData);
  return [parsedFileData, fileFormat];
};
