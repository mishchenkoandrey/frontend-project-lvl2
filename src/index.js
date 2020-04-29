import formatter from './formatters/formatter.js';

import formatterPlain from './formatters/formatterPlain.js';

import formatterJSON from './formatters/formatterJSON.js';

import genAST from './ast-builder.js';

const genDiff = (pathToFile1, pathToFile2, format) => {
  switch (format) {
    case 'plain':
      return formatterPlain(genAST(pathToFile1, pathToFile2));
    case 'json':
      return formatterJSON(genAST(pathToFile1, pathToFile2));
    default:
      return formatter(genAST(pathToFile1, pathToFile2));
  }
};

module.exports = genDiff;

export default genDiff;
