import path from 'path';

import fs from 'fs';

import yaml from 'js-yaml';

import ini from 'ini';

export default (pathToFile) => {
  const format = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile, 'utf-8');
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};
