import formatToStylish from './formatterStylish.js';

import formatToPlain from './formatterPlain.js';

import formatToJSON from './formatterJSON.js';

export default (outputFormat, ast) => {
  switch (outputFormat) {
    case 'plain':
      return formatToPlain(ast);
    case 'json':
      return formatToJSON(ast);
    default:
      return formatToStylish(ast);
  }
};
