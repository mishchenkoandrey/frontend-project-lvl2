import chooseFormat from './formatters/index.js';

import genAST from './ast-builder.js';

const genDiff = (pathToFile1, pathToFile2, format) => {
  const ast = genAST(pathToFile1, pathToFile2);
  return chooseFormat(format, ast);
};

export default genDiff;
