import makePlainOutput from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const chooseFormatter = (format) => {
  switch (format) {
    case 'plain':
      return makePlainOutput;
    case 'json':
      return json;
    default:
      return stylish;
  }
};
export default chooseFormatter;
