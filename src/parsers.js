import path from 'path';

import fs from 'fs';

import yaml from 'js-yaml';

export default (pathToFile) => {
  const format = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile, 'utf-8');
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};
