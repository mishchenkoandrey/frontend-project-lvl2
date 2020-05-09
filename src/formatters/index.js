import output from './formatter.js';

import outputToPlain from './formatterPlain.js';

import outputToJSON from './formatterJSON.js';

export default (format, ast) => {
  switch (format) {
    case 'plain':
      return outputToPlain(ast);
    case 'json':
      return outputToJSON(ast);
    default:
      return output(ast);
  }
};
