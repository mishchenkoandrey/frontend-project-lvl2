import path from 'path';

import fs from 'fs';

import chooseFormat from './formatters/index.js';

import genAST from './ast-builder.js';

import parse from './parsers.js';

const genDiff = (pathToFile1, pathToFile2, format) => {
  const file1format = path.extname(pathToFile1);
  const file1data = fs.readFileSync(pathToFile1, 'utf-8');
  const file1parsedData = parse(file1format, file1data);
  const file2format = path.extname(pathToFile2);
  const file2data = fs.readFileSync(pathToFile2, 'utf-8');
  const file2parsedData = parse(file2format, file2data);
  const ast = genAST(file1parsedData, file2parsedData);
  return chooseFormat(format, ast);
};

export default genDiff;
