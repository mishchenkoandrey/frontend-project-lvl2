import path from 'path';

import fs from 'fs';

import chooseOutputFormat from './formatters/index.js';

import genAST from './ast-builder.js';

import parse from './parsers.js';

const readFile = (pathToFile) => {
  const extension = path.extname(pathToFile);
  const data = fs.readFileSync(pathToFile, 'utf-8');
  return parse(extension, data);
};

const genDiff = (pathToFile1, pathToFile2, outputFormat) => {
  const data1 = readFile(pathToFile1);
  const data2 = readFile(pathToFile2);
  const ast = genAST(data1, data2);
  return chooseOutputFormat(outputFormat, ast);
};

export default genDiff;
